import React, { useState } from "react";
import { Auth } from "aws-amplify";
import BlockUi from "react-block-ui";
import { ToastContainer } from "react-toastify";
import { useFormFields } from "../libs/hooksLib";
import { Notify } from "../libs/notify";
import { validateResetEmail, validateResetForm } from "../libs/validate";
import { formStyle } from "../styles/form.js";

const PasswordReset = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    confirmationCode: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [revealPassword, triggerRevealPassword] = useState(false);
  const maskPassword = () => {
    triggerRevealPassword(!revealPassword);
  };
  async function sendCode(event) {
    event.preventDefault();
    setIsSendingCode(true);
    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (e) {
      Notify.error(e.message);
      setIsSendingCode(false);
    }
  }

  async function confirmPassword(event) {
    event.preventDefault();
    setIsConfirming(true);
    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.confirmationCode,
        fields.newPassword
      );
      Notify.general("Password has been reset.");
      props.history.push("/login");
    } catch (e) {
      Notify.error(e.message);
      setIsConfirming(false);
    }
  }

  function renderCodeRequestForm() {
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
          <div class="container max-w-sm mx-auto  xs:py-12 flex-1 flex flex-col items-center justify-center px-2 smlandscape:py-4">
            <BlockUi blocking={isSendingCode}>
              <form id="form" class="mt-6" onSubmit={sendCode}>
                <div
                  id="form-content"
                  class="bg-white px-6 py-8 rounded shadow-md text-black w-full"
                >
                  <h1 class="mb-8 xs:text-xl text-2xl font-bold text-center text-gray-700">
                    Reset Your Password
                  </h1>

                  <input
                    type="text"
                    class="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline"
                    id="email"
                    placeholder="Email Address"
                    onChange={handleFieldChange}
                  />

                  <button
                    type="submit"
                    class="w-full text-center py-3 rounded font-bold bg-gray-200 text-gray-700 hover:bg-gray-600 focus:outline-none my-1"
                    disabled={!validateResetEmail(fields.email)}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </BlockUi>
          </div>
        </div>
      </>
    );
  }

  function renderResetForm() {
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
          <div class="container max-w-sm mx-auto  xs:py-12 flex-1 flex flex-col items-center justify-center px-2 smlandscape:py-4">
            <BlockUi blocking={isConfirming}>
              <form id="form" class="mt-6" onSubmit={confirmPassword}>
                <div
                  id="form-content"
                  class="bg-white px-6 py-8 rounded shadow-md text-black w-full"
                >
                  <h1 class="mb-8 xs:text-xl text-2xl font-bold text-center text-gray-700">
                    Reset Your Password
                  </h1>

                  <input
                    type="text"
                    class={formStyle.inputBottom}
                    id="confirmationCode"
                    placeholder="Confirmation Code"
                    value={fields.confirmationCode}
                    onChange={handleFieldChange}
                  />
                  <input
                    type={revealPassword ? "text" : "password"}
                    id="newPassword"
                    class={formStyle.inputBottom}
                    name="newPassword"
                    placeholder="Password"
                    value={fields.newPassword}
                    onChange={handleFieldChange}
                  />

                  <input
                    type={"password"}
                    class="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none focus:shadow-outline"
                    id="confirmNewPassword"
                    value={fields.confirmNewPassword}
                    placeholder="Confirm New Password"
                    onChange={handleFieldChange}
                  />
                  <a class="text-left cursor-pointer">
                    <h1
                      class="text-gray-800 font-bold md:mb-2"
                      onClick={maskPassword}
                    >
                      {revealPassword ? "Hide" : "Show"} Password
                    </h1>
                  </a>
                  <button
                    type="submit"
                    class="w-full text-center py-3 rounded font-bold bg-gray-200 text-gray-700 hover:bg-gray-600 focus:outline-none my-1"
                    disabled={
                      !validateResetForm(
                        fields.newPassword,
                        fields.confirmNewPassword
                      )
                    }
                  >
                    Confirm Password Reset
                  </button>
                </div>
              </form>
            </BlockUi>
          </div>
        </div>
      </>
    );
  }

  return <div>{!codeSent ? renderCodeRequestForm() : renderResetForm()}</div>;
};
export default PasswordReset;
