import { reactive } from "vue";

const toastState = reactive({
  message: "",
  type: "info",
});

export function useToast() {
  const showToast = (message, type = "info", duration = 3000) => {
    toastState.message = message;
    toastState.type = type;
    setTimeout(() => {
      toastState.message = "";
    }, duration);
  };

  return {
    toastState,
    showToast,
  };
}
