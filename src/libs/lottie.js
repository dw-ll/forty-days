import home from "../home.json";

export const lottieOptions = {
  loop: true,
  autoplay: true,
  margin: "0px",
  animationData: home,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
export const lottieStyles = {
  overflow: "hidden",
  "margin-left": "12px !important",
  outline: "none",
};
