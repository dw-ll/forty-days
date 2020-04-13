import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import classNames from 'classnames';
import './styles/app.css';
import Routes from './Routes';
function App() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authenticatedUser, setAuthenticatedUser] = useState(false);

  const handleOnClick = () => {
    setOpen(!open);
  };

  var burgerClass = classNames('px-2 pt-2 pb-4 sm:flex items-end', {
    'block': open,
    'hidden': !open
  });
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setAuthenticatedUser(true);
    } catch (e) {
      if (e !== 'No current user') {
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
    !isAuthenticating &&
    <div class="h-screen">
      <header class='bg-white sm:flex sm:justify-between sm:px-4 sm:py-5'>
        <div class='flex items-center justify-between bg-white px-4 py-3 sm:p-0'>
          <div>
            <a href="/">
              <span class="font-semibold text-2xl tracking-tight pl-12">Forty Days</span>
            </a>
          </div>
          <div>
            <button onClick={handleOnClick} type='button' class='md:hidden text-gray-700 focus:outline-none'>
              <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>
        {authenticatedUser
          ? <a href='/' onClick={handleLogout} class='block px-2 py-1  font-semibold hover:bg-gray-100 text-right sm:mt-0'> Logout</a>
          :
          <>
            <div class={burgerClass}>
              <a href='/login' class='block px-2 py-1  font-semibold hover:bg-gray-100 text-right sm:mt-0'>Login</a>
              <a href='/signup' class='mt-1 block px-2 py-1 font-semibold hover:bg-gray-100 text-right sm:mt-0 sm:ml-2' >Sign up</a>
            </div>
          </>
        }
      </header>
      <div class='main-wrapper bg-grey-200 min-h-3/4'>
        <Routes appProps={{ authenticatedUser, setAuthenticatedUser }} />
      </div>
    </div >

  );
}

export default withRouter(App);
