import api from './axios.js';

export default {
  async getTickets(payload) {
    try {
      const response = await api.get('/tickets/', payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets api');
      throw error;
    }
  },

  async createTicket(payload) {
    try {
      const response = await api.post('/tickets/', payload);
      return response.data;
    } catch (error) {
      console.error('Create ticket API error');
      throw error;
    }
  },

  async viewTicketDetails(id, params = {}) {
    try {
      const response = await api.get(`/tickets/${id}`, { params });
      return response.data;
    } catch (error) {
      console.error('View ticket details API error');
      throw error;
    }
  },

  async updateTicket(ticketId, payload) {
    try {
      const response = await api.patch(`/tickets/${ticketId}/`, payload);
      return response.data;
    } catch (error) {
      console.error('Ticket update API error');
      throw error;
    }
  },
};
