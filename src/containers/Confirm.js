import React, { useState } from "react";
import BlockUi from "react-block-ui";
import { useFormFields } from "../libs/hooksLib.js";
import { Auth } from "aws-amplify";

const Confirm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    confirmationCode: "",
  });
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      props.setAuthenticatedUser(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }
  function validateConfirmationForm() {
    console.log("validating confirmation code");
    return fields.confirmationCode.length > 0;
  }
  return (
    <div class="login sm:flex sm:pt-24 sm:justify-center bg-blue-100">
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
                onChange={handleFieldChange}
              />
              <h6> Please check your email to confirm your account.</h6>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                disabled={!validateConfirmationForm()}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </BlockUi>
      </div>
    </div>
  );
};

export default Confirm;
