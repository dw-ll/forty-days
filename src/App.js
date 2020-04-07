import React from 'react';
import './styles/app.css';
import Home from './components/Home';
function App() {
  return (
    <div class="App bg-gray-100">
      <nav class='flex items-center justify-between flex-wrap bg-white p-5'>
        <a href="/">
          <span class="font-semibold text-xl tracking-tight">Forty Days</span>
        </a>
      </nav>
      <div class='container xl:px-8'>
        <Home />
      </div>
    </div>

  );
}

export default App;
