import api from './axios.js';

export default {
  async createUser(payload) {
    try {
      const response = await api.post('/account/register/', payload);
      return response.data;
    } catch (error) {
      console.error('Registration API error:', error);
      throw error;
    }
  },

  async verifyUser(payload) {
    try {
      const response = await api.post('/account/verify-otp/', payload);
      return response.data;
    } catch (error) {
      console.error('Verification API error:', error);
      throw error;
    }
  },

  async loginUser(payload) {
    try {
      const response = await api.post('/account/login/', payload);
      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async resendOtp(payload) {
    try {
      const response = await api.post('/account/resend-otp/', payload);
      return response.data;
    } catch (error) {
      console.error('Resend OTP API error:', error);
      throw error;
    }
  },

  async refreshUser(payload) {
    try {
      const response = await api.post('/token/refresh', payload);
      return response.data;
    } catch (error) {
      console.error('refresh API error:', error);
      throw error;
    }
  },

  async getUser(config = {}) {
    try {
      const response = await api.get('/account/me/', config);
      return response.data;
    } catch (error) {
      console.error('Get User API error:', error);
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
      console.error('Get User API error:', error);
      throw error;
    }
  },

  async generateCertificate(enrollmentId) {
  try {
    const res = await api.post('/learning/certificates/generate/', {
      enrollment_id: enrollmentId
    });

    return res.data;

  } catch (error) {
    console.error('Certificate generation failed:', error);
    throw error;
  }
},

  async loadCertificate(certificateId) {
  try {
    const res = await api.get(`/learning/certificates/${certificateId}/`);
    return res.data;

  } catch (error) {
    console.error('Failed to fetch certificate:', error);
    throw error;
  }
},

  async contactForm(payload) {
    try {
      const response = await api.post('/contact/', payload);
      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async getContactForm(params = {}) {
  const response = await api.get('/contact/', { params });
  return response.data;
},
  async changePassword(payload) {
    try {
      const response = await api.post('/account/change-password', payload);
      return response.data;
    } catch (error) {
      console.error('Change password API error:', error);
      throw error;
    }
  },
  async forgotPassword(payload) {
    try {
      const response = await api.post('/account/forgot-password', payload);
      return response.data;
    } catch (error) {
      console.error('Change password API error:', error);
      throw error;
    }
  },
};
