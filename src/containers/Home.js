import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import TextLoop from "react-text-loop";
import Lottie from "react-lottie";
import home from "../home2.json";
import "../styles/app.css";
const lottieOptions = {
  loop: true,
  autoplay: true,
  margin: "0px",
  animationData: home,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const lottieStyles = {
  overflow: "hidden",
  margin: "0px !important",
  outline: "none",
};
const phrases = ["jot down how you're feeling,", "see how others are feeling,"];
const Home = (props) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [isLoading, setIsloading] = useState(true);
  const [noteModal, setNoteModal] = useState(false);

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
  const toggleNoteModal = (note) => {
    setNoteModal(!noteModal);
    setCurrentNote(note);
  };

  const renderModal = (note) => {
    return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          onClick={() => setNoteModal(false)}
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl x:px-2">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl font-semibold">{note.title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setNoteModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none pl-2 pt-2">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-gray-600 text-lg leading-relaxed">
                  {note.content}
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => setNoteModal(false)}
                >
                  Close
                </button>
                <a href={`notes/${note.noteId}`}>
                  <button
                    className="bg-gray-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    Edit
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  const renderNoteList = (notes) => {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <div>
          {noteModal && renderModal(currentNote)}

          <div
            onClick={() => {
              toggleNoteModal(note);
            }}
            class="block group hover:bg-gray-300 p-4 border-b w-full"
            key={i}
            id={note}
          >
            <p class="font-bold text-lg mb-1 text-black group-hover:text-white">
              {note.title}
            </p>
            <p class="text-grey-darker mb-2 group-hover:text-white">
              {note.content.trim().split("\n")[0]}
            </p>
            <p class="flex items-end">
              Written: {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
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
        <div class="w-screen bg-gray-400 smlandscape:h-1/2 md:py-12 md:h-half mdlandscape:h-screen lg:py-8 lg:h-forty xl:h-half max-h-half">
          <div class="header-content flex pt-8 md:px-2">
            <div class="md:w-3/4 pb-2 xl:pt-12 xl:pl-10">
              <div class="px-2 mb-2 md:hidden">
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
              <h2 class="text-sm ml-3 sm:ml-6 smlandscape:ml-4 md:ml-12 md:pl-0 md:pt-4 md:text-2xl lg:text-xl lg:ml-0 xl:ml-4 lg:pl-8 xl:text-3xl font-bold">
                Share how you're feeling, anonymously.
              </h2>
              <h2 class="md:hidden pl-3 text-md pr-2 text-gray-700">
                We're experiencing an extremely isolating and digital time in
                our lives. Forty Days is a space to listen and talk to others by
                journaling, without worrying about any sort of identity.
              </h2>
              <h2 class="invisible md:visible ml-12 text-md md:text-xl lg:ml-8 xl:ml-12 xl:text-2xl text-gray-700">
                We're experiencing an extremely isolating and digital time in
                our lives.
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
