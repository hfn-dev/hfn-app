import api from "./axios.js";

export default {
  async listResources(params = {}) {
    try {
      const response = await api.get("/member/resources/", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("List membership resources API error:", error);
      throw error;
    }
  },
};
