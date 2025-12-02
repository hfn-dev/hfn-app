import api from "./axios.js";

export default {
  async createUser(payload) {
    try {
      const response = await api.post("/account/register/", payload);
      return response.data;
    } catch (error) {
      console.error("Registration API error:", error);
      throw error;
    }
  },

  async verifyUser(payload) {
    try {
      const response = await api.post("/account/verify-otp/", payload);
      return response.data;
    } catch (error) {
      console.error("Verification API error:", error);
      throw error;
    }
  },

  async loginUser(payload) {
    try {
      const response = await api.post("/account/login/", payload);
      return response.data;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },

  async resendOtp(payload) {
    try {
      const response = await api.post("/account/resend-otp/", payload);
      return response.data;
    } catch (error) {
      console.error("Resend OTP API error:", error);
      throw error;
    }
  },

  async refreshUser(payload) {
    try {
      const response = await api.post("/token/refresh", payload);
      return response.data;
    } catch (error) {
      console.error("refresh API error:", error);
      throw error;
    }
  },
};
