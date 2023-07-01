const mapping: Record<string, string> = {
  'event-attendees': 'event_attendee',
  'event-sponsors': 'event_sponsor',
  'event-team-members': 'event_team_member',
  'event-vendors': 'event_vendor',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
