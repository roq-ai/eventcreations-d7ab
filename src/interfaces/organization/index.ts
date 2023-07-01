import { EventAttendeeInterface } from 'interfaces/event-attendee';
import { EventSponsorInterface } from 'interfaces/event-sponsor';
import { EventTeamMemberInterface } from 'interfaces/event-team-member';
import { EventVendorInterface } from 'interfaces/event-vendor';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  event_attendee?: EventAttendeeInterface[];
  event_sponsor?: EventSponsorInterface[];
  event_team_member?: EventTeamMemberInterface[];
  event_vendor?: EventVendorInterface[];
  user?: UserInterface;
  _count?: {
    event_attendee?: number;
    event_sponsor?: number;
    event_team_member?: number;
    event_vendor?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
