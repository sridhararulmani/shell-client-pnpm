import { toast } from "react-toastify";

// Function to show success toast
export const showSuccessToast = (message) => {
  toast.success(message);
};

// Function to show error toast
export const showErrorToast = (message) => {
  toast.error(message);
};

// Function to show warning toast
export const showWarningToast = (message) => {
  toast.warning(message);
};

// Function to show warning toast
export const showInfoToast = (message) => {
  toast.info(message);
};

// Function to show update toast
export const showUpdateToast = (message) => {
  toast.update(message);
};

// Function to show Done toast
export const showDoneToast = (message) => {
  toast.done(message);
};

// Function to show update toast
export const showLoadingToast = (message) => {
  toast.loading(message);
};