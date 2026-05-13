import api from './axios.js';

export default {
  async createApplication(payload) {
    try {
      const response = await api.post(
        '/account/individual-applications/',
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Registration API error');
      throw error;
    }
  },
  async getApplications(payload) {
    try {
      const response = await api.get(
        '/account/individual-applications/',
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Registration API error');
      throw error;
    }
  },
  async createUser(payload) {
    try {
      const response = await api.post('/account/register/', payload);
      return response.data;
    } catch (error) {
      console.error('Registration API error');
      throw error;
    }
  },

  async verifyUser(payload) {
    try {
      const response = await api.post('/account/verify-otp/', payload);
      return response.data;
    } catch (error) {
      console.error('Verification API error');
      throw error;
    }
  },

  async loginUser(payload) {
    try {
      const response = await api.post('/account/login/', payload);
      return response.data;
    } catch (error) {
      console.error('Login API error');
      throw error;
    }
  },

  async resendOtp(payload) {
    try {
      const response = await api.post('/account/resend-otp/', payload);
      return response.data;
    } catch (error) {
      console.error('Resend OTP API error');
      throw error;
    }
  },

  async refreshUser(payload) {
    try {
      const response = await api.post('/token/refresh', payload);
      return response.data;
    } catch (error) {
      console.error('refresh API error');
      throw error;
    }
  },

  async getUser(config = {}) {
    try {
      const response = await api.get('/account/me/', config);
      return response.data;
    } catch (error) {
      console.error('Get User API error');
      throw error;
    }
  },

  async uploadProfileImage(formData) {
    return api
      .post('/users/profile/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => res.data);
  },
  async getUserList() {
    try {
      const response = await api.get('/account/users/');
      return response.data;
    } catch (error) {
      console.error('Get User API error');
      throw error;
    }
  },

  async getCorporateUsers(params = {}) {
    try {
      const response = await api.get('/account/users/', { params });
      return response.data;
    } catch (error) {
      console.error('Get User API error');
      throw error;
    }
  },

  async partialProfileUpdate(payload) {
    try {
      const response = await api.patch('/account/profile/update/', payload);
      return response.data;
    } catch (error) {
      console.error('Update API error');
      throw error;
    }
  },

  async profileUpdate(payload) {
    try {
      const response = await api.put('/account/profile/update/', payload);
      return response.data;
    } catch (error) {
      console.error('Update API error');
      throw error;
    }
  },

  async getApplications() {
    try {
      const response = await api.get('/account/admin/individual-applications/');
      return response.data;
    } catch (error) {
      console.error('Get User API error');
      throw error;
    }
  },

  async generateCertificate(enrollmentId) {
    try {
      const res = await api.post('/learning/certificates/generate/', {
        enrollment_id: enrollmentId,
      });

      return res.data;
    } catch (error) {
      console.error('Certificate generation failed');
      throw error;
    }
  },

  async loadCertificate(certificateId) {
    try {
      const res = await api.get(`/learning/certificates/${certificateId}/`);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch certificate');
      throw error;
    }
  },

  async contactForm(payload) {
    try {
      const response = await api.post('/contact/', payload);
      return response.data;
    } catch (error) {
      console.error('Login API error');
      throw error;
    }
  },

  async getContactForm(params = {}) {
    const response = await api.get('/contact/', { params });
    return response.data;
  },
  async changePassword(payload) {
    try {
      const response = await api.post('/account/change-password/', payload);
      return response.data;
    } catch (error) {
      console.error('Change password API error');
      throw error;
    }
  },
  async forgotPassword(payload) {
    try {
      const response = await api.post('/account/forgot-password/', payload);
      return response.data;
    } catch (error) {
      console.error('Change password API error');
      throw error;
    }
  },
};
