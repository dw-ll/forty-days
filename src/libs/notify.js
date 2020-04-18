import React from "react";
import { toast } from "react-toastify";
import { css } from "glamor";

export const Notify = {
  error(err) {
    return toast.error(<h1 class="text-sm">{err}</h1>, {
      className: css({
        background: "#F56565 !important",
        color: "black !important",
      }),
      position: toast.POSITION.TOP_CENTER,
    });
  },
  general(msg) {
    return toast.info(<h1 class="text-sm">{msg}</h1>, {
      className: css({
        background: "#E2E8F0 !important",
        color: "black !important",
      }),
      position: toast.POSITION.TOP_CENTER,
    });
  },
};
