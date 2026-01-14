import api from "./axios.js";

export default {
  async listDirectoryUsers(params = {}) {
    try {
      const response = await api.get("/messaging/connections/directory/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("List directory users API error:", error);
      throw error;
    }
  },

  async searchDirectoryUsers(searchQuery, params = {}) {
    try {
      const response = await api.get("/messaging/connections/directory/", {
        params: { search: searchQuery, ...params },
      });
      return response.data;
    } catch (error) {
      console.error("Search directory users API error:", error);
      throw error;
    }
  },

  async getDirectoryUsersByLetter(letter, params = {}) {
    try {
      const response = await api.get("/messaging/connections/directory/", {
        params: { letter, ...params },
      });
      return response.data;
    } catch (error) {
      console.error("Get directory users by letter API error:", error);
      throw error;
    }
  },
  
  async listUsers(params = {}) {
    try {
      const response = await api.get("/users/directory/", { params });
      return response.data;
    } catch (error) {
      console.error("List users API error:", error);
      throw error;
    }
  },

  async getUser(id) {
    try {
      const response = await api.get(`/users/directory/${id}/`);
      return response.data;
    } catch (error) {
      console.error("Get user API error:", error);
      throw error;
    }
  },

  async searchUsers(query) {
    try {
      const response = await api.get("/users/directory/search/", {
        params: { q: query },
      });
      return response.data;
    } catch (error) {
      console.error("Search users API error:", error);
      throw error;
    }
  },

  async connectUser(payload) {
    try {
      const response = await api.post("/users/connections/connect/", payload);
      return response.data;
    } catch (error) {
      console.error("Connect user API error:", error);
      throw error;
    }
  },

  async disconnectUser(payload) {
    try {
      const response = await api.post(
        "/users/connections/disconnect/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Disconnect user API error:", error);
      throw error;
    }
  },

  async getConnections(params = {}) {
    try {
      const response = await api.get("/users/connections/", { params });
      return response.data;
    } catch (error) {
      console.error("Get connections API error:", error);
      throw error;
    }
  },

  async getConnectionStatus(payload) {
    try {
      const response = await api.post("/users/connections/status/", payload);
      return response.data;
    } catch (error) {
      console.error("Connection status API error:", error);
      throw error;
    }
  },
};
