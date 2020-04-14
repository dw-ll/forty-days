import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import TextLoop from "react-text-loop";
import "../styles/app.css";

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
        <div class="w-screen bg-gray-400 md:py-12 md:h-half max-h-half">
          <div class="header-content flex pt-8">
            <div class="md:w-3/4 pb-2 xl:pt-12 xl:pl-10">
              <div class="md:hidden">
                <lottie-player
                  src="https://assets1.lottiefiles.com/packages/lf20_Mz7MDP.json"
                  background="transparent"
                  speed="1"
                  style={{ width: "150px", height: "100px" }}
                  loop
                  autoplay
                  class=""
                ></lottie-player>
              </div>
              <div class="md:w-1/4 xs:mt-4">
                <h1 class="text-xl md:text-4xl text-gray-900 font-semibold px-6 md:mt-6 md:px-4 ">
                  Forty Days
                </h1>

                <h2 class="text-sm sm:text-xl xl:text-2xl px-6 md:px-4">
                  A space to <TextLoop children={phrases} /> during the COVID-19
                  pandemic.
                </h2>
              </div>

              <div class="mt-6 ml-6 xs:pb-4 sm:px-16 items-end">
                <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-md">
                  Sign Up
                </button>
              </div>
            </div>

            <div class="hidden lg:block">
              <lottie-player
                src="https://assets1.lottiefiles.com/packages/lf20_Mz7MDP.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
                class="lg:pl-18 "
              ></lottie-player>
            </div>
          </div>
        </div>

        <div class="content container">
          <div class="md:w-1/2 xs:pt-8">
            <div class="md:hidden mx-auto">
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
            <h2 class="ml-4 sm:ml-6 md:pl-12 md:pt-10 md:pt-32 lg:ml-6 text-sm md:text-2xl lg:text-3xl font-bold">
              Share how you're feeling, anonymously.
            </h2>
            <h2 class="md:hidden pl-4 md:pl-16 text-md md:text-xl xl:text-2xl text-gray-700">
              We're experiencing an extremely isolating and digital time in our
              lives. Forty Days is a space to listen and talk to others by
              journaling, without worrying about any sort of identity.
            </h2>
            <h2 class="invisible md:visible pl-8 md:pl-16 text-md md:text-xl xl:text-2xl text-gray-700">
              We're experiencing an extremely isolating and digital time in our
              lives.
            </h2>

            <h2 class="invisible md:visible pl-8 md:pl-16 text-md md:text-xl xl:text-2xl text-gray-700">
              Forty Days is a space to listen and talk to others by journaling,
              without worrying about any sort of identity.
            </h2>
          </div>
          <div class="sm:w-1/4 md:w-1/2 h-full">
            <div class="hidden lg:block">
              <lottie-player
                src="https://assets7.lottiefiles.com/packages/lf20_Kwds3V.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
                class="md:hidden lg:pl-24 md:pt-8"
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
