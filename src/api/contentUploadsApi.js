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

 
};
