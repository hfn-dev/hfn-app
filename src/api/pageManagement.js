import api from "./axios.js";

export default {
  async listPages() {
    try {
      const response = await api.get("/api/pages/");
      return response.data;
    } catch (error) {
      console.error("List Pages API error:", error);
      throw error;
    }
  },

  async getPageByType(pageType) {
    try {
      const response = await api.get(`/api/pages/${pageType}/`);
      return response.data;
    } catch (error) {
      console.error("Get Page By Type API error:", error);
      throw error;
    }
  },

  async createPage(payload) {
    try {
      const response = await api.post("/api/pages/", payload);
      return response.data;
    } catch (error) {
      console.error("Create Page API error:", error);
      throw error;
    }
  },

  async updatePage(pageType, payload) {
    try {
      const response = await api.put(`/api/pages/${pageType}/`, payload);
      return response.data;
    } catch (error) {
      console.error("Update Page API error:", error);
      throw error;
    }
  },

  async partialUpdatePage(pageType, payload) {
    try {
      const response = await api.patch(`/api/pages/${pageType}/`, payload);
      return response.data;
    } catch (error) {
      console.error("Partial Update Page API error:", error);
      throw error;
    }
  },

  async publishPage(pageType) {
    try {
      const response = await api.post(`/api/pages/${pageType}/publish/`, {});
      return response.data;
    } catch (error) {
      console.error("Publish Page API error:", error);
      throw error;
    }
  },

  async updatePageVisibility(pageType, payload) {
    try {
      const response = await api.patch(
        `/api/pages/${pageType}/visibility/`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Page Visibility API error:", error);
      throw error;
    }
  },

  async deletePage(pageType) {
    try {
      const response = await api.delete(`/api/pages/${pageType}/`);
      return response.data;
    } catch (error) {
      console.error("Delete Page API error:", error);
      throw error;
    }
  },
};
