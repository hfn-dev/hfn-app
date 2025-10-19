// import { defineStore } from 'pinia';
// import { ref } from 'vue';

// export const useAuthStore = defineStore('auth', () => {
//   const isAuthenticated = ref(false);
//   const user = ref(null);

//   function login(userData = { id: 1, name: 'Admin User' }) {
//     isAuthenticated.value = true;
//     user.value = userData;
//     console.log('User logged in. isAuthenticated:', isAuthenticated.value);
//   }

//   function logout() {
//     isAuthenticated.value = false;
//     user.value = null;
//     console.log('User logged out.');
//   }

//   return { isAuthenticated, user, login, logout };
// });

// import { defineStore } from 'pinia';
// import { ref } from 'vue';

// /**
//  * Defines the Pinia store for managing application-wide authentication state.
//  * This file is only the definition. It MUST be initialized in the entry point
//  * or component where it is used if the application entry file (main.js)
//  * cannot perform global setup.
//  */
// export const useAuthStore = defineStore('auth', () => {
//   // State: holds the authentication status
//   const isAuthenticated = ref(false);
//   const user = ref(null); // Placeholder for user data

//   /**
//    * Action to mark the user as logged in.
//    * @param {Object} userData - Data about the logged-in user.
//    */
//   function login(userData = { id: 1, username: 'Admin User' }) {
//     isAuthenticated.value = true;
//     user.value = userData;
//     console.log('User logged in. isAuthenticated:', isAuthenticated.value);
//   }

//   /**
//    * Action to mark the user as logged out.
//    */
//   function logout() {
//     isAuthenticated.value = false;
//     user.value = null;
//     console.log('User logged out.');
//   }

//   // Expose state and actions
//   return { isAuthenticated, user, login, logout };
// });

import { ref } from 'vue';

export const isAuthenticated = ref(false);

export const useAuth = () => {
  const login = () => (isAuthenticated.value = true);
  const logout = () => (isAuthenticated.value = false);

  return { isAuthenticated, login, logout };
};
