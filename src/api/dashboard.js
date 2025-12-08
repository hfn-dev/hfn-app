import api from "./axios.js";

export default {
  async fetchDashboard(params = {}) {
    try {
      const response = await api.get("/analytics/dashboard/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Dashboard API error:", error);
      throw error;
    }
  },

  async fetchCourseAnalytics(params = {}) {
    try {
      const response = await api.get("/analytics/courses/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Course Analytics API error:", error);
      throw error;
    }
  },

  async fetchUserAnalytics(params) {
    try {
      const response = await api.get("/analytics/users/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("User Analytics API error:", error);
      throw error;
    }
  },

  async fetchWebsiteAnalytics(params) {
    try {
      const response = await api.get("/analytics/website/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Website Analytics API error:", error);
      throw error;
    }
  },

  async fetchRevenueAnalytics(params) {
    try {
      const response = await api.get("/analytics/revenue/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Revenue Analytics API error:", error);
      throw error;
    }
  },

  async fetchMembershipAnalytics() {
    try {
      const response = await api.get("/analytics/membership/");
      return response.data;
    } catch (error) {
      console.error("Membership Analytics API error:", error);
      throw error;
    }
  },
};
