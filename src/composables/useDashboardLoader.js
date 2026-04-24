import { ref } from 'vue';

const globalLoading = ref(false);
const loadingMessage = ref('Loading data...');

export function useDashboardLoader() {
  const setLoading = (loading = true, message = 'Loading data...') => {
    globalLoading.value = loading;
    loadingMessage.value = message;
  };

  const startLoading = (message = 'Loading data...') => {
    globalLoading.value = true;
    loadingMessage.value = message;
  };

  const stopLoading = () => {
    globalLoading.value = false;
  };

  return {
    globalLoading,
    loadingMessage,
    setLoading,
    startLoading,
    stopLoading
  };
}