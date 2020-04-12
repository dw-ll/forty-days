import React from 'react';
import TextLoop from 'react-text-loop';
import '../styles/app.css';



const Home = () => {
    const phrases = ["jot down how you're feeling,", "see how others are feeling,"]
    return (
        <div class="w-screen bg-gray-400 py-12">
            <h1 class='text-2xl sm:text-4xl text-gray-900 font-semibold mt-6 px-8 sm:px-32'>Forty Days</h1>
            <h2 class='text-md sm:text-lg px-8 sm:px-32'>A space to <TextLoop children={phrases}/> during the COVID-19 pandemic.</h2>
            <div class='mt-4 px-8 sm:px-32'>
                <a href='#' class='mt-3 inline-block px-5 py-3 rounded-lg bg-indigo-500 hvr:bg-indigo-800 shadow-lg text-white  tracking-wider font-semibold'>
                    Get Started
                </a>
            </div>


        </div>
    );

}
export default Home;