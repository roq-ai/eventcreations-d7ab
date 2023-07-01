import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { eventTeamMemberValidationSchema } from 'validationSchema/event-team-members';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.event_team_member
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEventTeamMemberById();
    case 'PUT':
      return updateEventTeamMemberById();
    case 'DELETE':
      return deleteEventTeamMemberById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEventTeamMemberById() {
    const data = await prisma.event_team_member.findFirst(convertQueryToPrismaUtil(req.query, 'event_team_member'));
    return res.status(200).json(data);
  }

  async function updateEventTeamMemberById() {
    await eventTeamMemberValidationSchema.validate(req.body);
    const data = await prisma.event_team_member.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteEventTeamMemberById() {
    const data = await prisma.event_team_member.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
