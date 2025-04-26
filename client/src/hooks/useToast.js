// src/hooks/useToast.js
import { toast } from "react-toastify";

const useToast = () => {
  const showSuccess = (msg) => toast.success(msg);
  const showError = (msg) => toast.error(msg);
  const showInfo = (msg) => toast.info(msg);
  const showWarning = (msg) => toast.warn(msg);

  return { showSuccess, showError, showInfo, showWarning };
};

export default useToast;
