import api from './axios.js';

export default {
  async listArticles(params = {}) {
    try {
      const response = await api.get('/news/', { params });
      return response.data;
    } catch (error) {
      console.error('List articles API error');
      throw error;
    }
  },

  async getFeaturedArticles() {
    try {
      const response = await api.get('/news/featured/');
      return response.data;
    } catch (error) {
      console.error('Get featured articles API error');
      throw error;
    }
  },

  async getArticle(slug) {
    try {
      const response = await api.get(`/news/${slug}/`);
      return response.data;
    } catch (error) {
      console.error('Get single article API error');
      throw error;
    }
  },

  async createArticle(payload) {
    try {
      const response = await api.post('/news/', payload);
      return response.data;
    } catch (error) {
      console.error('Create article API error');
      throw error;
    }
  },

  async updateArticle(slug, payload) {
    try {
      const response = await api.put(`/news/${slug}/`, payload);
      return response.data;
    } catch (error) {
      console.error('Update article API error');
      throw error;
    }
  },

  async partialUpdateArticle(slug, payload) {
    try {
      const response = await api.patch(`/news/${slug}/`, payload);
      return response.data;
    } catch (error) {
      console.error('Partial update article API error');
      throw error;
    }
  },

  async publishArticle(slug) {
    try {
      const response = await api.post(`/news/${slug}/publish/`, {});
      return response.data;
    } catch (error) {
      console.error('Publish article API error');
      throw error;
    }
  },

  async deleteArticle(slug) {
    try {
      const response = await api.delete(`/news/${slug}/`);
      return response.data;
    } catch (error) {
      console.error('Delete article API error');
      throw error;
    }
  },

  async downloadMinutes (slug) {
    try {
      const response = await api.get(`/news/${slug}/`);
      return response.data;
    } catch (error) {
      console.error('Delete article API error');
      throw error;
    }
  },
  async getNewsletters(params = {}) {
    try {
      const response = await api.get('/media/newsletters/', { params });
      return response.data;
    } catch (error) {
      console.error('List articles API error');
      throw error;
    }
  },
  async getSingleNewsletters(params = {}) {
    try {
      const response = await api.get(`/media/newsletters/${slug}`, { params });
      return response.data;
    } catch (error) {
      console.error('List articles API error');
      throw error;
    }
  },
  async postNewsletters() {
    try {
      const response = await api.post('/media/newsletters/');
      return response.data;
    } catch (error) {
      console.error('Publish article API error');
      throw error;
    }
  },
  async getMinutes(params = {}) {
    try {
      const response = await api.get('/media/meeting-minutes/', { params });
      return response.data;
    } catch (error) {
      console.error('List articles API error');
      throw error;
    }
  },
  async getSingleMinutes(params = {}) {
    try {
      const response = await api.get(`/media/meeting-minutes/${slug}`, { params });
      return response.data;
    } catch (error) {
      console.error('List articles API error');
      throw error;
    }
  },
  async postMinutes() {
    try {
      const response = await api.post('/media/meeting-minutes/');
      return response.data;
    } catch (error) {
      console.error('Publish article API error');
      throw error;
    }
  },

};
