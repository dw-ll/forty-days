import React, { useState, useEffect } from "react";
import {withRouter, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import classNames from "classnames";
import "./styles/app.css";
import Routes from "./Routes";
function App() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  var burgerClass = classNames("px-2 py-1 sm:flex items-end", {
    block: open,
    hidden: !open,
  });
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setAuthenticatedUser(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    setAuthenticatedUser(false);
  }

  return (
    !isAuthenticating && (
      <div class="h-screen">
        <header class="bg-white sm:flex sm:justify-between sm:px-4 sm:py-1">
          <div class="flex items-center justify-between bg-white px-4 py-1 sm:p-0">
            <div>
              <a href="/">
                <h1 class="font-semibold text-2xl md:text-2xl lg:text-3xl tracking-normal lg:pl-0 xl:pl-4">
                  Forty Days
                </h1>
              </a>
            </div>
            <div>
              <button
                onClick={handleOnClick}
                type="button"
                class="invisible xs:visible py-2 text-gray-700 focus:outline-none"
              >
                <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path
                    fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {authenticatedUser ? (
            <>
              <div class={burgerClass}>
                <a
                  href="/"
                  onClick={handleLogout}
                  class="block px-2 py-2 font-semibold hover:bg-gray-100 text-right sm:mt-0 cursor-pointer"
                >
                  Logout
                </a>
              </div>
            </>
          ) : (
            <>
              <div class={burgerClass}>
                <a
                  href="/login"
                  class="block px-1 py-1 text-gray-700 hover:text-gray-900 md:px-2 md:py-4  font-semibold  text-right sm:mt-0 cursor-pointer"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  class="px-1 py-1 text-gray-700 hover:text-gray-900 block md:px-2 md:py-4 font-semibold  text-right sm:mt-0 sm:ml-2 cursor-pointer"
                >
                  Sign up
                </a>
              </div>
            </>
          )}
        </header>
        <div class="main-wrapper">
          <Routes appProps={{ authenticatedUser, setAuthenticatedUser }} />
        </div>
      </div>
    )
  );
}

export default withRouter(App);
