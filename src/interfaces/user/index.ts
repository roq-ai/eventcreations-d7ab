import { EventAttendeeInterface } from 'interfaces/event-attendee';
import { EventSponsorInterface } from 'interfaces/event-sponsor';
import { EventTeamMemberInterface } from 'interfaces/event-team-member';
import { EventVendorInterface } from 'interfaces/event-vendor';

import { GetQueryInterface } from '../get-query.interface';

export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roq_user_id: string;
  tenant_id: string;

  event_attendee: EventAttendeeInterface[];
  event_sponsor: EventSponsorInterface[];
  event_team_member: EventTeamMemberInterface[];
  event_vendor: EventVendorInterface[];
}

export interface UserGetQueryInterface extends GetQueryInterface {
  roq_user_id?: string;
  tenant_id?: string;
}
