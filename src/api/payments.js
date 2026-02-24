import api from './axios.js';

export default {
  async getPaymentList(params = {}) {
    const { data } = await api.get('/payment/', { params });
    return data;
  },
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
    const { data } = await api.post('/payment/broadcast/unpaid/', payload);
    return data;
  },

  async coursePayment(payload) {
    const { data } = await api.post('/payment/course_intent/', payload);
    return data;
  },

  async memberPayment(payload) {
    const { data } = await api.post('/payment/membership_intent/', payload);
    return data;
  },
  async confirmPayment(payload, id) {
    const { data } = await api.post(`/membership/payments/${id}/confirm_payment/`, payload);
    return data;
  },
  async retrievePayment(id) {
    const { data } = await api.get(`/membership/payments/${id}/`);
    return data;
  },
  async removePayment(id) {
    const { data } = await api.delete(`/membership/payments/${id}/`);
    return data;
  },
  async getUnpaidMembers() {
    const { data } = await api.get('/membership/subscriptions/members-with-unpaid-or-no-active-subscription/');
    return data;
  },
};
