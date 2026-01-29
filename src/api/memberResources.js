import api from "./axios.js";

export default {
  listResources() {
    return api.get("/member/resources");
  },
};
