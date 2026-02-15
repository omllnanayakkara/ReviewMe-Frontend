import { Bounce, toast } from "react-toastify";

// Display error messages
export const displayToastError = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClickrtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
    transition: Bounce,
  });
  return;
};

// Display success messages
export const displayToastSuccess = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 2500,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClickrtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
    transition: Bounce,
  });
  return;
};
