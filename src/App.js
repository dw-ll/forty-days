import React, { useState } from 'react';
import classNames from 'classnames';
import './styles/app.css';
import Routes from './Routes';
function App() {
  const [open, setOpen] = useState(false);
  const handleOnClick = () => {
    setOpen(!open);
  };
  var burgerClass = classNames('px-2 pt-2 pb-4 sm:flex items-end', {
    'block': open,
    'hidden': !open
  });
  return (
    <div class="App bg-gray-200">
      <header class='bg-white sm:flex sm:justify-between sm:px-4 sm:py-5'>
        <div class='flex items-center justify-between bg-white px-4 py-3 sm:p-0'>
          <div>
            <a href="/">
              <span class="font-semibold text-xl tracking-tight">Forty Days</span>
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
        <div class={burgerClass}>
          <a href='/login' class='block px-2 py-1  font-semibold hover:bg-gray-100 text-right sm:mt-0'>Login</a>
          <a href='/signup' class='mt-1 block px-2 py-1 font-semibold hover:bg-gray-100 text-right sm:mt-0 sm:ml-2' >Sign up</a>
        </div>
      </header>
      <div class='main-wrapper'>
        <Routes />
      </div>
    </div >

  );
}

export default App;
