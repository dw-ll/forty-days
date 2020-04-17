import React, { useState } from "react";
import { Auth } from "aws-amplify";
import BlockUi from "react-block-ui";
import { useFormFields } from "../libs/hooksLib";
import "react-block-ui/style.css";

import "../styles/app.css";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateSignIn() {
    return fields.email.length > 0 && fields.password.length > 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      props.setAuthenticatedUser(true);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  return (
    <div class="bg-gray-400 min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 smlandscape:py-4">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 xs:text-2xl text-3xl text-center text-gray-700">
            Log in to Forty Days
          </h1>
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            class="w-full text-center py-3 rounded bg-gray-200 text-gray-700 hover:bg-gray-600 focus:outline-none my-1"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
