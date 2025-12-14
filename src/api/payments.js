import api from './axios.js';

export default {
  async getRegistrations(params = {}) {
    const { data } = await api.get('/payment/registration/', { params });
    return data;
  },

  async getPurchases(params = {}) {
    const { data } = await api.get('/payment/purchases/', { params });
    return data;
  },

  async editPayment(id, payload) {
    const { data } = await api.put(`/payment/edit/${id}`, payload);
    return data;
  },

  async deletePayment(id) {
    const { data } = await api.delete(`/payment/delete/${id}`);
    return data;
  },

  async broadcastToUnpaid(payload) {
    const { data } = await api.post('/payment/broadcast/unpaid', payload);
    return data;
  },
};
