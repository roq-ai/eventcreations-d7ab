import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { organizationValidationSchema } from 'validationSchema/organizations';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getOrganizations();
    case 'POST':
      return createOrganization();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getOrganizations() {
    const data = await prisma.organization
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'organization'));
    return res.status(200).json(data);
  }

  async function createOrganization() {
    await organizationValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.event_attendee?.length > 0) {
      const create_event_attendee = body.event_attendee;
      body.event_attendee = {
        create: create_event_attendee,
      };
    } else {
      delete body.event_attendee;
    }
    if (body?.event_sponsor?.length > 0) {
      const create_event_sponsor = body.event_sponsor;
      body.event_sponsor = {
        create: create_event_sponsor,
      };
    } else {
      delete body.event_sponsor;
    }
    if (body?.event_team_member?.length > 0) {
      const create_event_team_member = body.event_team_member;
      body.event_team_member = {
        create: create_event_team_member,
      };
    } else {
      delete body.event_team_member;
    }
    if (body?.event_vendor?.length > 0) {
      const create_event_vendor = body.event_vendor;
      body.event_vendor = {
        create: create_event_vendor,
      };
    } else {
      delete body.event_vendor;
    }
    const data = await prisma.organization.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
