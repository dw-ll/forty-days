import React from 'react';
import TextLoop from 'react-text-loop';
import '../styles/app.css';



const Home = () => {
    const phrases = ["jot down how you're feeling,", "see how others are feeling,"]
    return (
        <div class="px-8 py-12 mx-auto max-h max-w-md max-h-md sm:mx-auto md:mx-auto lg:mx-32 sm:max-w-xl lg:px-2 xl:px-0">
            <h1 class='text-4xl text-gray-900 font-semibold mt-6'>Forty Days</h1>
            <h2 class='text-md sm:text-lg'>A space to <TextLoop children={phrases}/> during the COVID-19 pandemic.</h2>
            
            <div class='mt-4'>
                <a href='#' class='mt-3 inline-block px-5 py-3 rounded-lg bg-indigo-400 hvr:bg-indigo-800 shadow-lg text-white  tracking-wider font-semibold'>
                    Get Started
                </a>
            </div>


        </div>
    );

}
export default Home;