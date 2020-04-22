import React, { useState } from "react";
import { Auth } from "aws-amplify";
import BlockUi from "react-block-ui";
import { ToastContainer, Flip } from "react-toastify";
import { Notify } from "../libs/notify";
import { useFormFields } from "../libs/hooksLib";
import { validateSignIn } from "../libs/validate";
import { formStyle } from "../styles/formStyle";
import "react-block-ui/style.css";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      props.setAuthenticatedUser(true);
    } catch (e) {
      Notify.error(e.message);
      setIsLoading(false);
    }
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <div class={formStyle.container}>
        <div class={formStyle.wrapper}>
          <BlockUi blocking={isLoading}>
            <form id="form" class={formStyle.form} onSubmit={handleSubmit}>
              <div class={formStyle.body}>
                <h1 class={formStyle.header}>Log in to Forty Days</h1>
                <input
                  type="text"
                  id="email"
                  class={formStyle.input}
                  name="email"
                  placeholder="Email"
                  onChange={handleFieldChange}
                />

                <input
                  type="password"
                  id="password"
                  class={formStyle.inputBottom}
                  name="password"
                  placeholder="Password"
                  onChange={handleFieldChange}
                />

                <button
                  type="submit"
                  class={formStyle.button}
                  disabled={!validateSignIn(fields.email, fields.password)}
                >
                  Log In
                </button>
              </div>
            </form>
          </BlockUi>
          <span class="flex">
            <a href="/login/reset">
              <h1 class="text-gray-700 hover:text-gray-900 font-bold">
                Forgot your password?
              </h1>
            </a>
          </span>
        </div>
      </div>
    </>
  );
};
export default Login;
