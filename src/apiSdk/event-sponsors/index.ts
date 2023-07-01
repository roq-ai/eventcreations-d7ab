import axios from 'axios';
import queryString from 'query-string';
import { EventSponsorInterface, EventSponsorGetQueryInterface } from 'interfaces/event-sponsor';
import { GetQueryInterface } from '../../interfaces';

export const getEventSponsors = async (query?: EventSponsorGetQueryInterface) => {
  const response = await axios.get(`/api/event-sponsors${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEventSponsor = async (eventSponsor: EventSponsorInterface) => {
  const response = await axios.post('/api/event-sponsors', eventSponsor);
  return response.data;
};

export const updateEventSponsorById = async (id: string, eventSponsor: EventSponsorInterface) => {
  const response = await axios.put(`/api/event-sponsors/${id}`, eventSponsor);
  return response.data;
};

export const getEventSponsorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/event-sponsors/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEventSponsorById = async (id: string) => {
  const response = await axios.delete(`/api/event-sponsors/${id}`);
  return response.data;
};
