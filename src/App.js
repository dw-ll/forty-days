import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav class="flex items-center justify-between flex-wrap bg-white border-black p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span href="/" class="font-semibold color-black text-black text-xl tracking-tight">Forty Days</span>
        </div>
        <div class="block lg:hidden">

          <button class="flex items-center px-3 py-2 border rounded text-black border-yellow-300 hover:text-grey-600">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-right lg:w-auto">
          <div class="text-md lg:flex-grow">
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-yellow-300 mr-4">
              Docs
               </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-yellow-300 mr-4">
              Docs
               </a>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-yellow-300 mr-4">
              Docs
               </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
