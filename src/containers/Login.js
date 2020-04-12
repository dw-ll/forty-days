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
    console.log("in submit");
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      props.setAuthenticatedUser(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  return (
    <div class="login pl-6 lg:pl-32 xl:pl-64 pt-24 lg:pt-32 xl:pt-48 justify-center bg-gray-400 h-screen">
      <div class="lg:ml-8 xl:ml-10">
        <h1 class="font-bold pl-10 lg:ml-16 xl:ml-20 md:pl-48 mb-6 text-2xl md:text-3xl">
          Log in to Forty Days
        </h1>
        <div class="w-full lg:ml-32 xl:ml-64 content-center max-w-xs">
          <BlockUi tag="div" blocking={isLoading}>
            <form
              class="bg-white shadow-lg rounded px-8 pt-8 pb-6 mb-4"
              onSubmit={handleSubmit}
            >
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Email Address
                </label>

                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                  placeholder="Email Address"
                  onChange={handleFieldChange}
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Password
                </label>

                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="password"
                  placeholder="Password"
                  onChange={handleFieldChange}
                />
              </div>

              <div class="flex items-center justify-between">
                <button
                  class="bg-gray-500 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  disabled={!validateSignIn()}
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </BlockUi>
        </div>
      </div>
    </div>
  );
};
export default Login;
