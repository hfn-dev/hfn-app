import { computed, ref } from 'vue';

const role = ref(localStorage.getItem('role') || null);
const user = ref(JSON.parse(localStorage.getItem('user')) || null);

export function useAuth() {
  const isAuthenticated = computed(() => !!role.value && !!user.value);

  const login = (userData) => {
    role.value = userData.role;
    user.value = userData.user;

    localStorage.setItem('role', userData.role);
    localStorage.setItem('user', JSON.stringify(userData.user));
  };

  const logout = () => {
    role.value = null;
    user.value = null;
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { role, user, isAuthenticated, login, logout };
}
