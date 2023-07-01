import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { eventAttendeeValidationSchema } from 'validationSchema/event-attendees';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.event_attendee
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEventAttendeeById();
    case 'PUT':
      return updateEventAttendeeById();
    case 'DELETE':
      return deleteEventAttendeeById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEventAttendeeById() {
    const data = await prisma.event_attendee.findFirst(convertQueryToPrismaUtil(req.query, 'event_attendee'));
    return res.status(200).json(data);
  }

  async function updateEventAttendeeById() {
    await eventAttendeeValidationSchema.validate(req.body);
    const data = await prisma.event_attendee.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEventAttendeeById() {
    const data = await prisma.event_attendee.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
