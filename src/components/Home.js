import React from 'react';
import '../styles/app.css';


const Home = () => {
    return (
        <div class="px-8 py-12 max-w-md max-h-md mx-auto sm:max-w-xl">
                <h1 class='text-4xl text-gray-900 font-bold mt-6'>Forty Days</h1>
                <h2 class='text-md sm:text-lg'>A space to jot down how you're feeling, during the COVID-19 pandemic.</h2>
            <div class='mt-4'>
                <a href='#' class='inline-block px-5 py-3 rounded-lg bg-indigo-400 hvr:bg-indigo-800 shadow-lg text-white  tracking-wider'>
                      Get Started
                </a>
            </div>


        </div>
    );

}
export default Home;