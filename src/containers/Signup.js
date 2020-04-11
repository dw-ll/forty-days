import React, { useState } from "react";
import { useFormFields } from "../libs/hooksLib.js";
import { Auth } from "aws-amplify";
import BlockUi from "react-block-ui";

const Signup = (props) => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    console.log(fields);
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.confirmPassword === fields.password
    );
  }
  function validateConfirmationForm() {
    console.log("validating confirmation code");
    return fields.confirmationCode.length > 0;
  }
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      if (e.code === "UsernameExistsException") {
        Auth.resendSignUp(fields.email);
        alert(
          "Looks like you haven't confirmed your account yet, check your email for a confirmation code!"
        );
        props.history.push("/confirm");
      } else {
        console.log(e);
        alert(e.message);
        setIsLoading(false);
      }
    }
  }

  function renderForm() {
    return (
      <div class="login sm:flex sm:pt-24 sm:justify-center bg-blue-100">
        <div class="w-full max-w-xs">
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
              <div class="mb-4">
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
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Confirm Password
                </label>

                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleFieldChange}
                />
              </div>

              <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  disabled={!validateForm()}
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </BlockUi>
        </div>
      </div>
    );
  }

  return <div class="sign-up">{renderForm()}</div>;
};

export default Signup;
