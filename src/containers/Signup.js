import React, { useState } from "react";
import { useFormFields } from "../libs/hooksLib.js";
import { Auth } from "aws-amplify";
import { ToastContainer, Flip } from "react-toastify";
import { Notify } from "../libs/notify";
import { validateForm, validateConfirmationForm } from "../libs/validate";
import { formStyle } from "../styles/formStyle";
import BlockUi from "react-block-ui";
import "react-toastify/dist/ReactToastify.css";

const Signup = (props) => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationForm, setConfirmationForm] = useState(false);
  const [revealPassword, triggerRevealPassword] = useState(false);
  const [visited, setVisited] = useState(false);
  const [notified, setNotified] = useState(false);

  const maskPassword = () => {
    triggerRevealPassword(!revealPassword);
  };
  function popInstructions() {
    if (fields.password.length === 0 && !visited) {
      setVisited(true);
      Notify.general(
        "Your password must be at least 8 characters and include: a special character, number and uppercase letter."
      );
    }
  }
  function popConfirm() {
    Notify.general(
      "We've sent you an e-mail to confirm your account, please check your inbox."
    );
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newSignUp = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });

      setConfirmationForm(true);
      setIsLoading(false);
    } catch (e) {
      if (e.code === "UsernameExistsException") {
        Auth.resendSignUp(fields.email);
        setIsLoading(false);
        setConfirmationForm(true);
      } else if (e.code === "InvalidParameterException") {
        Notify.error(
          "Your password must be at least 8 characters and include: a special character, number and uppercase letter."
        );
        setIsLoading(false);
      } else {
        Notify.error(e.message);
        setIsLoading(false);
      }
    }
  }
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      props.setAuthenticatedUser(true);
      setConfirmationForm(true);
      props.history.push("/");
    } catch (e) {
      setIsLoading(false);
      Notify.error(e.message);
    }
  }

  function renderConfirmationForm() {
    if (!fields.confirmationCode && !notified) {
      setNotified(true);
      Notify.general(
        "We've sent you an e-mail to confirm your account, please check your inbox."
      );
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
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <div class="bg-gray-400 min-h-screen md:flex  flex-col">
          <div class={formStyle.wrapper}>
            <BlockUi blocking={isLoading}>
              <form
                id="form"
                class={formStyle.form}
                onSubmit={handleConfirmationSubmit}
              >
                <div id="form-content" class={formStyle.body}>
                  <h1 class={formStyle.header}>Confirm Your Account</h1>

                  <input
                    type="text"
                    class={formStyle.inputBottom}
                    id="confirmationCode"
                    placeholder="Confirmation Code"
                    value={fields.confirmationCode}
                    onChange={handleFieldChange}
                  />
                  <button
                    type="submit"
                    class={formStyle.button}
                    disabled={
                      !validateConfirmationForm(fields.confirmationCode)
                    }
                  >
                    Confirm Account
                  </button>
                </div>
              </form>
            </BlockUi>
          </div>
        </div>
      </>
    );
  }

  function renderForm() {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5500}
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
              <form
                autocomplete="off"
                id="form"
                class={formStyle.form}
                onSubmit={handleSubmit}
              >
                <div id="form-content" class={formStyle.body}>
                  <h1 class={formStyle.header}>Sign up with Forty Days</h1>

                  <input
                    type="text"
                    class={formStyle.input}
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={fields.email}
                    onChange={handleFieldChange}
                  />

                  <input
                    type={revealPassword ? "text" : "password"}
                    id="password"
                    class={formStyle.inputBottom}
                    name="password"
                    placeholder="Password"
                    value={fields.password}
                    onChange={handleFieldChange}
                    onMouseEnter={popInstructions}
                  />

                  <a class="text-left cursor-pointer">
                    <h1
                      class="text-gray-800 font-bold md:mb-6"
                      onClick={maskPassword}
                    >
                      {revealPassword ? "Hide" : "Show"} Password
                    </h1>
                  </a>

                  <button
                    type="submit"
                    class={formStyle.button}
                    disabled={!validateForm(fields.email, fields.password)}
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </BlockUi>
            <span class="flex">
              <h1 class=" text-gray-700 font-bold pr-1">
                Already have an account?
              </h1>
              <a href="/login">
                <h1 class="text-gray-700 hover:text-gray-900 font-bold">
                  Log in
                </h1>
              </a>
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      {newUser || showConfirmationForm
        ? renderConfirmationForm()
        : renderForm()}
    </div>
  );
};

export default Signup;
