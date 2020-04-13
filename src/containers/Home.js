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
      <>
        <div class="w-screen bg-gray-400 py-12 h-forty">
          <div class="header-content flex">
            <div class="md:w-3/4  xl:pt-12 xl:pl-10">
              <h1 class="text-4xl text-gray-900 font-semibold mt-6 px-4 sm:px-16">
                Forty Days
              </h1>
              <h2 class="text-md sm:text-lg xl:text-2xl px-4 sm:px-16">
                A space to <TextLoop children={phrases} /> during the COVID-19
                pandemic.
              </h2>
              <div class="mt-4 px-4 sm:px-16">
                <a
                  href="/signup"
                  class="mt-3 inline-block px-5 py-3 rounded-lg bg-gray-600 hover:bg-gray-800 shadow-lg text-white  tracking-wider font-semibold"
                >
                  Get Started
                </a>
              </div>
            </div>
            <div class="md:w-1/4">
              <lottie-player
                src="https://assets1.lottiefiles.com/packages/lf20_Mz7MDP.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
                class="pl-24 pt-8"
              ></lottie-player>
            </div>
          </div>
        </div>
        <div class="flex mb-4">
          <div class="md:w-1/2 h-full">
            <h2 class="pl-2 md:pl-16 pt-10 md:pt-32 text-lg md:text-2xl lg:text-3xl font-bold">
              Share how you're feeling, anonymously.
            </h2>
            <h2 class="pl-2 pr-5 md:pl-16 text-md md:text-xl xl:text-2xl text-gray-700">
              We're experiencing an extremely isolating and digital time in our
              lives.
            </h2>
            <h2 class="pl-2 md:pl-16 text-md md:text-xl xl:text-2xl text-gray-700">
              Forty Days is a space to listen and talk to others by journaling,
              without worrying about any sort of identity.
            </h2>
          </div>

          <div class="md:w-1/2 h-full">
            <div class="ml-32 xl:ml-48 py-2">
              <lottie-player
                src="https://assets7.lottiefiles.com/packages/lf20_Kwds3V.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                loop
                autoplay
                class="pl-24 pt-8"
              ></lottie-player>
            </div>
          </div>
        </div>
      </>
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
