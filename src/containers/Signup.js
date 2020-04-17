import React, { useState } from "react";
import { useFormFields } from "../libs/hooksLib.js";
import { Auth } from "aws-amplify";
import { ToastContainer } from "react-toastify";
import { notifyError, notifyConfirmation } from "../libs/notify";
import { validateForm, validateConfirmationForm } from "../libs/validate";
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
  const [activeToolTip, setToolTip] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (fields.password !== fields.confirmPassword) {
      notifyError("Passwords don't match.");
      return;
    }
    try {
      const newSignUp = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });

      setNewUser(newSignUp);
    } catch (e) {
      if (e.code === "UsernameExistsException") {
        Auth.resendSignUp(fields.email);

        setConfirmationForm(true);
      } else if (e.code === "InvalidParameterException") {
        notifyError(
          "Your password must be at least 8 characters and include: a special character, number and uppercase letter."
        );
      } else {
        notifyError(e.message);
      }
    }
  }
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      props.setAuthenticatedUser(true);
      setConfirmationForm(true);
      props.history.push("/");
    } catch (e) {
      notifyError(e);
    }
  }

  function renderConfirmationForm() {
    if (!fields.confirmationCode) {
      notifyConfirmation(
        "We've sent you an e-mail to confirm your account, please check your inbox."
      );
    }
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <div class="login px-6 xs:py-8 x:py-12 sm:flex sm:pt-24 sm:justify-center bg-gray-400 h-screen">
          <div class="w-full max-w-xs">
            <BlockUi blocking={isLoading}>
              <form
                class="bg-white shadow-lg rounded px-8 pt-8 pb-6 mb-4"
                onSubmit={handleConfirmationSubmit}
                type="tel"
              >
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="confirmation-code"
                  >
                    Confirmation Code
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmationCode"
                    placeholder="Confirmation Code"
                    value={fields.confirmationCode}
                    onChange={handleFieldChange}
                  />
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class="bg-gray-200 hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none"
                    disabled={
                      !validateConfirmationForm(fields.confirmationCode)
                    }
                    type="submit"
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
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />

        <div class="bg-gray-400 min-h-screen flex flex-col">
          <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 smlandscape:py-4">
            <form id="form" class="mt-6" onSubmit={handleSubmit}>
              <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 xs:text-xl text-2xl font-bold text-center text-gray-700">
                  Sign up with Forty Days
                </h1>

                <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleFieldChange}
                />

                <div class="relative">
                  <input
                    type={revealPassword ? "text" : "password"}
                    id="password"
                    class="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline"
                    name="password"
                    placeholder="Password"
                    onChange={handleFieldChange}
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <svg
                      class="h-6 text-gray-700"
                      fill="bg-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="bg-gray-700"
                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  class="w-full text-center py-3 rounded font-bold bg-gray-200 text-gray-700 hover:bg-gray-600 focus:outline-none my-1"
                  disabled={!validateForm(fields.email, fields.password)}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
  function handleToolTip() {
    setToolTip(!activeToolTip);
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
