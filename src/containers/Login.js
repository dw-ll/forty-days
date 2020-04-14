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
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  return (
    <div class="login pt-24 xs:px-8 x:pt-16 smlandscape:px-48 xlandscape:pl-64 smlandscape:h-full md:pl-24 lg:pl-32 lg:pt-32 xl:px-40 xl:pt-48 justify-center bg-gray-400 h-screen">
      <div class="py-8 pl-4 x:pl-2 x:py-16 xlandscape:ml-12 md:py-24 md:ml-40 lg:ml-24 xl:mx-32 xxl:mx-64 xxl:pl-40">
        <h1 class="font-bold mb-6 pl-8 xs:text-2xl x:text-2xl x:px-8 md:px-2  md:text-3xl lg:ml-32 lg:px-4 xl:ml-56 xl:px-10">
          Log in to Forty Days
        </h1>
        <div class="login-form w-full lg:ml-32 xl:ml-64 content-center max-w-xs">
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
