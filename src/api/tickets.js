import api from './axios.js';

export default {
  async getTickets(payload) {
    try {
      const response = await api.get('/api/tickets/', payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets api:', error);
      throw error;
    }
  },

  async createTicket(payload) {
    try {
      const response = await api.post('/api/create/', payload);
      return response.data;
    } catch (error) {
      console.error('Create ticket API error:', error);
      throw error;
    }
  },

  async viewTicketDetails(params = {}) {
    try {
      const response = await api.get(`/api/ticket/details/${slug}`, { params });
      return response.data;
    } catch (error) {
      console.error('View ticket details API error:', error);
      throw error;
    }
  },

  async updateTicket(ticketId, payload) {
    try {
      const response = await api.post(
        `/api/tickets/${ticketId}/update`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Ticket update API error:', error);
      throw error;
    }
  },
};
