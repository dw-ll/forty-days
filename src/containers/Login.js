import React, { useState } from "react";
import { Auth } from "aws-amplify";
import BlockUi from "react-block-ui";
import { ToastContainer, Flip } from "react-toastify";
import { Notify } from "../libs/notify";
import { useFormFields } from "../libs/hooksLib";
import { validateSignIn } from "../libs/validate";
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
    <div class="bg-gray-400 min-h-screen flex flex-col">
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
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 smlandscape:py-4">
        <BlockUi blocking={isLoading}>
          <form id="form" class="mt-6" onSubmit={handleSubmit}>
            <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 class="mb-8 xs:text-xl text-2xl text-center text-gray-700 font-bold">
                Log in to Forty Days
              </h1>
              <input
                type="text"
                id="email"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={handleFieldChange}
              />

              <input
                type="password"
                id="password"
                class="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={handleFieldChange}
              />

              <button
                type="submit"
                class="w-full text-center py-3 rounded bg-gray-200 text-gray-700 font-bold cursor-pointer hover:bg-gray-600 focus:outline-none my-1"
                disabled={!validateSignIn(fields.email, fields.password)}
              >
                Log In
              </button>
            </div>
          </form>
        </BlockUi>
      </div>
    </div>
  );
};
export default Login;
