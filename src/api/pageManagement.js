import api from './axios.js';

export default {
  async listPages() {
    try {
      const response = await api.get('/pages/');
      return response.data;
    } catch (error) {
      console.error('List Pages API error:', error);
      throw error;
    }
  },

  async getPageByType(pageType) {
    try {
      const response = await api.get(`/pages/${pageType}/`);
      return response.data;
    } catch (error) {
      console.error('Get Page By Type API error:', error);
      throw error;
    }
  },

  async createPage(payload) {
    try {
      const response = await api.post('/pages/', payload);
      return response.data;
    } catch (error) {
      console.error('Create Page API error:', error);
      throw error;
    }
  },

  async updatePage(pageType, payload) {
    try {
      const response = await api.put(`/pages/${pageType}/`, payload);
      return response.data;
    } catch (error) {
      console.error('Update Page API error:', error);
      throw error;
    }
  },

  async partialUpdatePage(pageType, payload) {
    try {
      const response = await api.patch(`/pages/${pageType}/`, payload);
      return response.data;
    } catch (error) {
      console.error('Partial Update Page API error:', error);
      throw error;
    }
  },

  async publishPage(pageType) {
    try {
      const response = await api.post(`/pages/${pageType}/publish/`, {});
      return response.data;
    } catch (error) {
      console.error('Publish Page API error:', error);
      throw error;
    }
  },

  async updatePageVisibility(pageType, isVisible) {
    try {
      const response = await api.patch(
        `/pages/${pageType}/visibility/`,
        { is_visible: isVisible }
      );
      return response.data;
    } catch (error) {
      console.error('Page Visibility API error:', error);
      throw error;
    }
  },

  async deletePage(pageType) {
    try {
      const response = await api.delete(`/pages/${pageType}/`);
      return response.data;
    } catch (error) {
      console.error('Delete Page API error:', error);
      throw error;
    }
  },
};
