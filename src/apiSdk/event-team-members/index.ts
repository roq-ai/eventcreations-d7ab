import axios from 'axios';
import queryString from 'query-string';
import { EventTeamMemberInterface, EventTeamMemberGetQueryInterface } from 'interfaces/event-team-member';
import { GetQueryInterface } from '../../interfaces';

export const getEventTeamMembers = async (query?: EventTeamMemberGetQueryInterface) => {
  const response = await axios.get(`/api/event-team-members${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEventTeamMember = async (eventTeamMember: EventTeamMemberInterface) => {
  const response = await axios.post('/api/event-team-members', eventTeamMember);
  return response.data;
};

export const updateEventTeamMemberById = async (id: string, eventTeamMember: EventTeamMemberInterface) => {
  const response = await axios.put(`/api/event-team-members/${id}`, eventTeamMember);
  return response.data;
};

export const getEventTeamMemberById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/event-team-members/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEventTeamMemberById = async (id: string) => {
  const response = await axios.delete(`/api/event-team-members/${id}`);
  return response.data;
};
