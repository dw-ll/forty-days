import React from "react";
import Lottie from "react-lottie";
import TextLoop from "react-text-loop";
import { lottieOptions, lottieStyles } from "../libs/lottie";
import { phrases } from "../libs/phrases";

const Landing = (props) => {
  return (
    <div>
      <div class="w-screen bg-gray-400 lg:h-half">
        <div class="header-content container flex justify-center items-center pt-8 md:px-2">
          <div class="md:w-3/4 pb-2 xl:pt-12 xl:pl-10">
            <div class="ml-4 mb-2 md:hidden">
              <Lottie options={lottieOptions} height={150} width={150} />
            </div>
            <div class=" xs:mt-4 md:py-8">
              <h1 class="text-xl md:text-4xl text-gray-900 font-semibold px-6 md:mt-6 md:px-8 galaxylandscape:py-2 galaxylandscape:text-2xl">
                Forty Days
              </h1>

              <h2 class="text-sm sm:text-xl lg:text-2xl px-6 md:px-8 md:mt-4">
                A space to <TextLoop children={phrases} /> during the COVID-19
                pandemic.
              </h2>
            </div>

            <div class="button-wrapper smlandscape:items-start smlandscape:ml-0 smlandscape:px-6 mt-4 ml-6 xs:pb-4 md:mt-0 sm:px-16 md:px-6 galaxylandscape:px-0 lg:px-6 md:ml-0 items-end">
              <a href="/signup">
                <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-md md:rounded-full md:w-48 lg:w-64 md:text-xl">
                  Sign Up
                </button>
              </a>
            </div>
          </div>

          <div class="hidden md:block">
            <Lottie
              options={lottieOptions}
              height={300}
              width={300}
              margin="0px"
              style={lottieStyles}
              class="lg:pl-18"
            />
          </div>
        </div>
      </div>

      <div class="content container flex mx-auto justify-center items-center ">
        <div class="lg:w-3/4  xs:pt-8 md:pt-16 md:pr-4 lg:pr-0 md:flex">
          <div class="lg:hidden md:w-1/4 md:ml-2 md:pl-2">
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_Kwds3V.json"
              background="transparent"
              speed="1"
              style={{ width: "200px", height: "200px" }}
              loop
              autoplay
              class=""
            ></lottie-player>
          </div>
          <div class="body-content md:w-3/4 md:ml-8 lg:ml-0 xl:ml-4 lg:pt-16 xxl:ml-10">
            <h2 class="text-sm ml-3 sm:ml-6 smlandscape:ml-3 md:ml-12 md:pl-0 md:pt-4 md:text-2xl lg:text-xl lg:ml-0 xl:ml-4 lg:pl-8 xl:text-3xl font-bold">
              Share how you're feeling, anonymously.
            </h2>
            <h2 class="md:hidden pl-3 text-md pr-2 text-gray-700">
              We're experiencing an extremely isolating and digital time in our
              lives. Forty Days is a space to listen and talk to others by
              journaling, without worrying about any sort of identity.
            </h2>
            <h2 class="invisible md:visible ml-12 text-md md:text-xl lg:ml-8 xl:ml-12 xl:text-2xl text-gray-700">
              We're experiencing an extremely isolating and digital time in our
              lives.
            </h2>

            <h2 class="invisible md:visible ml-12 text-md md:text-xl lg:ml-8 xl:ml-12 xl:text-2xl text-gray-700">
              Forty Days is a space to listen and talk to others by journaling,
              without worrying about any sort of identity.
            </h2>
          </div>
        </div>
        <div class="">
          <div class="hidden lg:block">
            <lottie-player
              src="https://assets7.lottiefiles.com/packages/lf20_Kwds3V.json"
              background="transparent"
              speed="1"
              style={{ width: "400px", height: "400px" }}
              loop
              autoplay
              class="py-6"
            ></lottie-player>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default Landing;
