import axios from 'axios';
import queryString from 'query-string';
import { EventAttendeeInterface, EventAttendeeGetQueryInterface } from 'interfaces/event-attendee';
import { GetQueryInterface } from '../../interfaces';

export const getEventAttendees = async (query?: EventAttendeeGetQueryInterface) => {
  const response = await axios.get(`/api/event-attendees${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEventAttendee = async (eventAttendee: EventAttendeeInterface) => {
  const response = await axios.post('/api/event-attendees', eventAttendee);
  return response.data;
};

export const updateEventAttendeeById = async (id: string, eventAttendee: EventAttendeeInterface) => {
  const response = await axios.put(`/api/event-attendees/${id}`, eventAttendee);
  return response.data;
};

export const getEventAttendeeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/event-attendees/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEventAttendeeById = async (id: string) => {
  const response = await axios.delete(`/api/event-attendees/${id}`);
  return response.data;
};
