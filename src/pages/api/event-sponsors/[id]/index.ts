import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { eventSponsorValidationSchema } from 'validationSchema/event-sponsors';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.event_sponsor
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEventSponsorById();
    case 'PUT':
      return updateEventSponsorById();
    case 'DELETE':
      return deleteEventSponsorById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEventSponsorById() {
    const data = await prisma.event_sponsor.findFirst(convertQueryToPrismaUtil(req.query, 'event_sponsor'));
    return res.status(200).json(data);
  }

  async function updateEventSponsorById() {
    await eventSponsorValidationSchema.validate(req.body);
    const data = await prisma.event_sponsor.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEventSponsorById() {
    const data = await prisma.event_sponsor.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
