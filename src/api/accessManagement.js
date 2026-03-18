import api from "./axios.js";

export default {

  async changeUserRole(payload) {
    try {
      const response = await api.post("/access/roles/change/", payload);
      return response.data;
    } catch (error) {
      console.error("Change user role API error:", error);
      throw error;
    }
  },

  async removeUserRole(payload) {
    try {
      const response = await api.post("/access/roles/remove/", payload);
      return response.data;
    } catch (error) {
      console.error("Remove user role API error:", error);
      throw error;
    }
  },

  async revokeRoleInvite(payload) {
    try {
      const response = await api.post("/access/roles/remove/", payload);
      return response.data;
    } catch (error) {
      console.error("Remove user role API error:", error);
      throw error;
    }
  },


  async viewRoleHistory(params = {}) {
    try {
      const response = await api.get("/access/roles/history/", { params });
      return response.data;
    } catch (error) {
      console.error("View role history API error:", error);
      throw error;
    }
  },

  async createRoleInvite(payload) {
    try {
      const response = await api.post("/access/invites/create/", payload);
      return response.data;
    } catch (error) {
      console.error("Create role invite API error:", error);
      throw error;
    }
  },

  async listRoleInvites(params = {}) {
    try {
      const response = await api.get("/access/invites/", { params });
      return response.data;
    } catch (error) {
      console.error("List role invites API error:", error);
      throw error;
    }
  },

  async resendRoleInvite(inviteId) {
    try {
      const response = await api.post(
        `/access/invites/${inviteId}/resend/`
      );
      return response.data;
    } catch (error) {
      console.error("Resend role invite API error:", error);
      throw error;
    }
  },

  async acceptRoleInvite(payload) {
    try {
      const response = await api.post("/access/invites/accept/", payload);
      return response.data;
    } catch (error) {
      console.error("Accept role invite API error:", error);
      throw error;
    }
  },

  async acceptRoleInviteByToken(token) {
    try {
      const response = await api.get(`/access/invites/accept/${token}/`);
      return response.data;
    } catch (error) {
      console.error("Accept role invite by token API error:", error);
      throw error;
    }
  },

  async declineRoleInvite(payload) {
    try {
      const response = await api.post("/access/invites/decline/", payload);
      return response.data;
    } catch (error) {
      console.error("Decline role invite API error:", error);
      throw error;
    }
  },

  async viewAccessLogs(params = {}) {
    try {
      const response = await api.get("/access/logs/", { params });
      return response.data;
    } catch (error) {
      console.error("View access logs API error:", error);
      throw error;
    }
  },
};
