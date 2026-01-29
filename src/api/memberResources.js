import api from "@/api";

export default {
  listResources() {
    return api.get("/member/resources");
  },
};
