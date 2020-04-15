import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import TextLoop from "react-text-loop";
import Lottie from "react-lottie";
import home from "../home2.json";
import "../styles/app.css";
const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: home,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const phrases = ["jot down how you're feeling,", "see how others are feeling,"];
const Home = (props) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.authenticatedUser) {
        return;
      }
      try {
        const notes = await loadNotes();
        setNotes(notes);
        console.log(notes);
      } catch (e) {
        alert(e);
      }
      setIsloading(false);
    }
    onLoad();
  }, [props.authenticatedUser]);

  const loadNotes = () => {
    return API.get("notes", "/notes");
  };

  const renderNoteList = (notes) => {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <a
          href={`notes/${note.noteId}`}
          class="block group hover:bg-gray-300 p-4 border-b w-full"
        >
          <p class="font-bold text-lg mb-1 text-black group-hover:text-white">
            {note.title}
          </p>
          <p class="text-grey-darker mb-2 group-hover:text-white">
            {note.content.trim().split("\n")[0]}
          </p>
        </a>
      ) : (
        <a href="/notes/new" class="block group hover:bg-gray-300 p-4 border-b">
          <p class="font-bold text-lg mb-1 text-black group-hover:text-white">
            <b>{"\uFF0B"}</b>
            Create a new note
          </p>
        </a>
      )
    );
  };
  const renderLanding = () => {
    return (
      <div>
        <div class="w-screen bg-gray-400 smlandscape:h-forty md:py-12 md:h-half mdlandscape:h-screen lg:py-8 lg:h-forty xl:h-half max-h-half">
          <div class="header-content flex pt-8 md:px-2">
            <div class="md:w-3/4 pb-2 xl:pt-12 xl:pl-10">
              <div class="md:hidden">
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

              <div class="button-wrapper smlandscape:items-start mt-4 ml-6 xs:pb-4 md:mt-0 sm:px-16 md:px-6 galaxylandscape:px-0 lg:px-6 md:ml-0 items-end">
                <a href="/signup">
                  <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-md md:rounded-full md:w-48 lg:w-64 md:text-xl">
                    Sign Up
                  </button>
                </a>
              </div>
            </div>

            <div class="hidden md:block">
              <Lottie options={lottieOptions} height={300} width={300} class='lg:pl-18' />
            </div>
          </div>
        </div>

        <div class="content inline-flex">
          <div class="lg:w-3/4 xs:pt-8 md:pt-16 md:pr-4 lg:pr-0 md:flex">
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
            <div class="body-content md:w-3/4 md:ml-8 lg:ml-0 xl:ml-4 lg:pt-16 xxl:ml-64">
              <h2 class="text-sm ml-4 sm:ml-6 smlandscape:ml-4 md:ml-12 md:pl-0 md:pt-4 md:text-2xl lg:text-xl lg:ml-0 xl:ml-4 lg:pl-8 xl:text-3xl font-bold">
                Share how you're feeling, anonymously.
              </h2>
              <h2 class="md:hidden pl-4 text-md  text-gray-700">
                We're experiencing an extremely isolating and digital time in
                our lives. Forty Days is a space to listen and talk to others by
                journaling, without worrying about any sort of identity.
              </h2>
              <h2 class="invisible md:visible ml-12 text-md md:text-xl lg:ml-8 xl:ml-12 xl:text-2xl text-gray-700">
                We're experiencing an extremely isolating and digital time in our lives.
              </h2>

              <h2 class="invisible md:visible ml-12 text-md md:text-xl lg:ml-8 xl:ml-12 xl:text-2xl text-gray-700">
                Forty Days is a space to listen and talk to others by
                journaling, without worrying about any sort of identity.
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
  const renderNotes = () => {
    return (
      <div class="notes w-screen py-8 px-12">
        <h1 class="sm:text-2xl lg:text-4xl w-full font-bold border-b-2">
          Your Notes
        </h1>
        <div class="items-center justify-center w-full py-8">
          <div class="overflow-hidden bg-white rounded w-full shadow-lg leading-normal">
            {!isLoading && renderNoteList(notes)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div class="home">
      {props.authenticatedUser ? renderNotes() : renderLanding()}
    </div>
  );
};
export default Home;
