import api from './axios.js'; 

export default {
  
  async list(params = {}) {
    try {
      const response = await api.get('/media/gallery/', { params });
      return response.data;
    } catch (error) {
      console.error('List uploads API error:', error);
      throw error;
    }
  },
 
  async get(id) {
    try {
      const response = await api.get(`/uploads/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Get upload API error:', error);
      throw error;
    }
  },

 
  async upload(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/uploads/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data; // should return { url: 'file_url_here' }
    } catch (error) {
      console.error('File upload API error:', error);
      throw error;
    }
  },

  
  async create(payload) {
    try {
      const response = await api.post('/uploads/', payload);
      return response.data;
    } catch (error) {
      console.error('Create upload API error:', error);
      throw error;
    }
  },

  
  async update(id, payload) {
    try {
      const response = await api.patch(`/uploads/${id}/`, payload);
      return response.data;
    } catch (error) {
      console.error('Update upload API error:', error);
      throw error;
    }
  },

  
  async delete(id) {
    try {
      const response = await api.delete(`/uploads/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Delete upload API error:', error);
      throw error;
    }
  },

  async gallery(params = {}) {
    try {
      const response = await api.get('/media/gallery/', { params });
      return response.data;
    } catch (error) {
      console.error('List gallery API error:', error);
      throw error;
    }
  },
  async singleGallery(params = {}) {
    try {
      const response = await api.get(`/media/gallery/${id}`, { params });
      return response.data;
    } catch (error) {
      console.error('List gallery API error:', error);
      throw error;
    }
  },
  async postGallery(payload) {
    try {
      const response = await api.post(`/media/gallery/`, payload);
      return response.data;
    } catch (error) {
      console.error('Update upload API error:', error);
      throw error;
    }
  },
  async getMinutes(params = {}) {
    try {
      const { data } = await api.get('/media/meeting-minutes/', { params });
      return data;
    } catch (error) {
      console.error('List meeting minutes error:', error);
      throw error;
    }
  },

  async getSingleMinutes(slug) {
    try {
      const { data } = await api.get(`/media/meeting-minutes/${slug}/`);
      return data;
    } catch (error) {
      console.error('Retrieve meeting minutes error:', error);
      throw error;
    }
  },

  async createMinutes(payload) {
    try {
      const { data } = await api.post(
        '/media/meeting-minutes/',
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (error) {
      console.error('Create meeting minutes error:', error);
      throw error;
    }
  },

  async updateMinutes(slug, payload) {
    try {
      const { data } = await api.patch(
        `/media/meeting-minutes/${slug}/`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (error) {
      console.error('Update meeting minutes error:', error);
      throw error;
    }
  },

  async deleteMinutes(slug) {
    try {
      const { data } = await api.delete(`/media/meeting-minutes/${slug}/`);
      return data;
    } catch (error) {
      console.error('Delete meeting minutes error:', error);
      throw error;
    }
  },

  async retrieveGallery(id) {
    try {
      const { data } = await api.get(`/media/gallery/${id}/`);
      return data;
    } catch (error) {
      console.error('Retrieve gallery image error:', error);
      throw error;
    }
  },

  async createGallery(payload) {
    try {
      const { data } = await api.post(
        '/media/gallery/',
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (error) {
      console.error('Upload gallery image error:', error);
      throw error;
    }
  },

  async updateGallery(id, payload) {
    try {
      const { data } = await api.patch(
        `/media/gallery/${id}/`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (error) {
      console.error('Update gallery image error:', error);
      throw error;
    }
  },

  async deleteGallery(id) {
    try {
      const { data } = await api.delete(`/media/gallery/${id}/`);
      return data;
    } catch (error) {
      console.error('Delete gallery image error:', error);
      throw error;
    }
  },

  async listNewsletters(params = {}) {
    try {
      const { data } = await api.get('/media/newsletters/', { params });
      return data;
    } catch (error) {
      console.error('List newsletters error:', error);
      throw error;
    }
  },

  async retrieveNewsletters(slug) {
    try {
      const { data } = await api.get(`/media/newsletters/${slug}/`);
      return data;
    } catch (error) {
      console.error('Retrieve newsletter error:', error);
      throw error;
    }
  },

  async createNewsletters(payload) {
    try {
      const { data } = await api.post(
        '/media/newsletters/',
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (error) {
      console.error('Create newsletter error:', error);
      throw error;
    }
  },

  async updateNewsletters(slug, payload) {
    try {
      const { data } = await api.patch(
        `/media/newsletters/${slug}/`,
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return data;
    } catch (error) {
      console.error('Update newsletter error:', error);
      throw error;
    }
  },

  async deleteNewsletters(slug) {
    try {
      const { data } = await api.delete(`/media/newsletters/${slug}/`);
      return data;
    } catch (error) {
      console.error('Delete newsletter error:', error);
      throw error;
    }
  },
 
};
