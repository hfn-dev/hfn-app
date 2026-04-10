import api from "./axios.js";

export default {
  async listExecutives(params = {}) {
    try {
      const response = await api.get("/executives/", { params });
      return response.data;
    } catch (error) {
      console.error("List executives API error");
      throw error;
    }
  },

  async getExecutive(id) {
    try {
      const response = await api.get(`/executives/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Get executive API error");
      throw error;
    }
  },

  async createExecutive(payload) {
    try {
      const response = await api.post("/executives/", payload);
      return response.data;
    } catch (error) {
      console.error("Create executive API error");
      throw error;
    }
  },

  async updateExecutive(id, payload) {
    try {
      const response = await api.put(`/executives/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.error("Update executive API error");
      throw error;
    }
  },

  async partialUpdateExecutive(id, payload) {
    try {
      const response = await api.patch(`/executives/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.error("Partial update executive API error");
      throw error;
    }
  },

  async hideExecutive(id) {
    try {
      const response = await api.patch(`/executives/${id}/`, {
        is_active: false,
      });
      return response.data;
    } catch (error) {
      console.error("Hide executive API error");
      throw error;
    }
  },

  async deleteExecutive(id) {
    try {
      const response = await api.delete(`/executives/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Delete executive API error");
      throw error;
    }
  },
};
