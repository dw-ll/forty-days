import { toast } from "react-toastify";

export const notifyError = (err) => {
  toast.error(err, {
    position: toast.POSITION.TOP_CENTER,
  });
};
export const notifyConfirmation = (msg) => {
  toast.info(msg, {
    position: toast.POSITION.TOP_CENTER,
  });
};
