import { computed, ref } from 'vue';

const role = ref(localStorage.getItem('role') || null);

export function useAuth() {
  const isAuthenticated = computed(() => !!role.value);

  const login = (userRole) => {
    role.value = userRole;
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    role.value = null;
    localStorage.removeItem('role');
  };

  return { role, isAuthenticated, login, logout };
}
