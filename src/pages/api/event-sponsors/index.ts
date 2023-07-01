import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { eventSponsorValidationSchema } from 'validationSchema/event-sponsors';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getEventSponsors();
    case 'POST':
      return createEventSponsor();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEventSponsors() {
    const data = await prisma.event_sponsor
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'event_sponsor'));
    return res.status(200).json(data);
  }

  async function createEventSponsor() {
    await eventSponsorValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.event_sponsor.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
