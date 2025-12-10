import api from "./axios.js";

export default {
  async getCategories(params = {}) {
    try {
      const response = await api.get("/learning/categories/", { params });
      return response;
    } catch (error) {
      console.error("list categories API error:", error);
      throw error;
    }
  },

  async getCategoriesById(slug, params = {}) {
    try {
      const response = await api.get(`/learning/categories/${slug}/`, {
        params,
      });
      return response;
    } catch (error) {
      console.error("list categories by id API error:", error);
      throw error;
    }
  },

  async getCourseCategory(slug, params = {}) {
    try {
      const response = await api.get(`/learning/categories/${slug}/courses/`, {
        params,
      });
      return response;
    } catch (error) {
      console.error("list course category API error:", error);
      throw error;
    }
  },

  async createCategory(payload) {
    try {
      const response = await api.post("/learning/categories/", payload);
      return response.data;
    } catch (error) {
      console.error("create category API error:", error);
      throw error;
    }
  },

  async updateCategory(payload) {
    try {
      const response = await api.put("/learning/categories/", payload);
      return response.data;
    } catch (error) {
      console.error("update category API error:", error);
      throw error;
    }
  },

  async deleteCategory(payload) {
    try {
      const response = await api.delete("/learning/categories/{slug}", payload);
      return response.data;
    } catch (error) {
      console.error("delete category API error:", error);
      throw error;
    }
  },

  async getAllCourses(payload) {
    try {
      const response = await api.get("/learning/courses/", payload);
      return response.data;
    } catch (error) {
      console.error("get all courses API error:", error);
      throw error;
    }
  },

  async listCourses(params = {}) {
    try {
      const response = await api.get("/learning/courses/", {
        params: params,
      });
      return response;
    } catch (error) {
      console.error("get all courses API error:", error);
      throw error;
    }
  },

  async getCoursesDetails(slug, params = {}) {
    try {
      const response = await api.get(`/learning/courses/${slug}/`, { params });
      return response;
    } catch (error) {
      console.error("get courses details API error:", error);
      throw error;
    }
  },

  async createCourses(payload) {
    try {
      const response = await api.post("/learning/courses/", payload);
      return response.data;
    } catch (error) {
      console.error("create courses API error:", error);
      throw error;
    }
  },

  async updateCourses(payload) {
    try {
      const response = await api.put("/learning/courses/{slug}/", payload);
      return response.data;
    } catch (error) {
      console.error("update courses API error:", error);
      throw error;
    }
  },

  async deleteCourse(payload) {
    try {
      const response = await api.delete("/learning/courses/{slug}", payload);
      return response.data;
    } catch (error) {
      console.error("delete course API error:", error);
      throw error;
    }
  },

  async listCourseModules(payload) {
    try {
      const response = await api.get(
        "/learning/courses/{slug}/modules",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("course modules API error:", error);
      throw error;
    }
  },

  async getModulesdetails(payload) {
    try {
      const response = await api.get("/learning/modules/{id}/", payload);
      return response.data;
    } catch (error) {
      console.error("get modules detail API error:", error);
      throw error;
    }
  },

  async getEnrollment() {
    try {
      const response = await api.get("/learning/enrollments/");
      return response;
    } catch (error) {
      console.error("get enrollment API error:", error);
      throw error;
    }
  },

  async getEnrollmentDetails(payload) {
    try {
      const response = await api.get("/learning/enrollments/{id}", payload);
      return response.data;
    } catch (error) {
      console.error("get enrollment details API error:", error);
      throw error;
    }
  },

  async courseEnrollment(payload) {
    try {
      const response = await api.post(
        "/learning/courses/{slug}/enroll",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("course enrollment API error:", error);
      throw error;
    }
  },

  async deleteEnrollmentDetails(payload) {
    try {
      const response = await api.delete(
        "/learning/courses/{id}/enroll/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("delete enrollment details API error:", error);
      throw error;
    }
  },

  async progressTracking(id, payload) {
    try {
      const response = await api.get(
        `/learning/lessons/${id}/progress/`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("progress tracking API error:", error);
      throw error;
    }
  },

  async completeLessonMark(id, payload) {
    try {
      const response = await api.get(
        `/learning/lessons/${id}/complete/`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("complete lesson mark API error:", error);
      throw error;
    }
  },

  async getCourseQuiz(payload) {
    try {
      const response = await api.get(
        "/learning/courses/{slug}/quizzes/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("get course quiz API error:", error);
      throw error;
    }
  },

  async getCourseQuizDetails(payload) {
    try {
      const response = await api.get("/learning/quizzes/{id}/", payload);
      return response.data;
    } catch (error) {
      console.error("get course quiz details API error:", error);
      throw error;
    }
  },

  async startCourseQuiz(payload) {
    try {
      const response = await api.post(
        "/learning/quizzes/{id}/start_attempt/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("start course quiz API error:", error);
      throw error;
    }
  },

  async submitCourseQuiz(payload) {
    try {
      const response = await api.post(
        "/learning/quizzes/{id}/submit_attempt/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("submit course quiz API error:", error);
      throw error;
    }
  },

  async listLessonComment(payload) {
    try {
      const response = await api.get(
        "/learning/lessons/{id}/comments/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("list comments API error:", error);
      throw error;
    }
  },

  async createLessonComment(payload) {
    try {
      const response = await api.post(
        "/learning/lessons/{id}/comments/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("create comments API error:", error);
      throw error;
    }
  },

  async deleteLessonComment(payload) {
    try {
      const response = await api.delete(
        "/learning/courses/{id}/reviews/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("delete comments API error:", error);
      throw error;
    }
  },

  async reviewCourse(payload) {
    try {
      const response = await api.get(
        "/learning/courses/{slug}/reviews/",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("review API error:", error);
      throw error;
    }
  },

  async createReview(payload) {
    try {
      const response = await api.post("/learning/reviews/", payload);
      return response.data;
    } catch (error) {
      console.error("create review API error:", error);
      throw error;
    }
  },

  async updateReview(payload) {
    try {
      const response = await api.put("/learning/reviews/{id}/", payload);
      return response.data;
    } catch (error) {
      console.error("update review API error:", error);
      throw error;
    }
  },

  async deleteReview(payload) {
    try {
      const response = await api.delete("/learning/reviews/{id}/", payload);
      return response.data;
    } catch (error) {
      console.error("update review API error:", error);
      throw error;
    }
  },

  async getCertificate(payload) {
    try {
      const response = await api.get("/learning/certificates/", payload);
      return response.data;
    } catch (error) {
      console.error("get certificate API error:", error);
      throw error;
    }
  },

  async getCertificateDetails(payload) {
    try {
      const response = await api.get("/learning/certificates/{id}/", payload);
      return response.data;
    } catch (error) {
      console.error("get certificate detail API error:", error);
      throw error;
    }
  },

  async verifyCertificate(payload) {
    try {
      const response = await api.get(
        "/learning/certificates/verify/?number={certificate_number}",
        payload
      );
      return response.data;
    } catch (error) {
      console.error("verify certificate API error:", error);
      throw error;
    }
  },
};
