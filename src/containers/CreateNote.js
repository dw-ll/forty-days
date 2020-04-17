import React, { useRef, useState } from "react";
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";

import BlockUi from "react-block-ui";
import config from "../config";

const CreateNote = (props) => {
  const file = useRef(null);
  const [note, handleNote] = useFormFields({
    title: "",
    content: "",
    attachment: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  function validateNote() {
    return note.content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file that is smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB, thanks!`
      );
      return;
    }
    setIsLoading(true);
    try {
      await createNote({ note });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createNote(newNote) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }
  return (
    <BlockUi blocking={isLoading}>
      <div class="page-wrapper flex mb-4 h-screen ">
        <ToastContainer />
        <div class="left-half hidden lg:flex w-1/2 py-12 h-full bg-gray-400">
          <div class="max-w-full max-w-xs">
            <form class="px-16 py-8 mb-4 lg:min-w-full" onSubmit={handleSubmit}>
              <div
                id="note-card"
                class="max-wm-sm rounded shadow-lg mt-12 bg-gray-100 lg:min-w-full"
              >
                <div id="note-content" class="px-6 py-4">
                  <div class="font-bold text-2x pt-4">
                    {note.title ? note.title : "New Note"}
                  </div>
                  <p
                    class="text-gray-700 text-base mt-8"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {note.content
                      ? note.content
                      : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="right-half lg:h-full w-screen lg:w-1/2 px-8 mdlandscape:overflow-y-scroll lg:px-0 bg-gray-500">
          <div class="form-wrapper max-w-full max-w-xs  mdlandscape:max-h-screen py-6 md:ml-8 lg:py-12 lg:ml-0 xl:ml-18 xxl:ml-18">
            <form
              class="px-2 mdlandscape:py-0 md:px-16 max-h-1/2 md:py-8 md:mb-4 lg:px-12 lg:min-w-full"
              onSubmit={handleSubmit}
            >
              <div
                id="note-card"
                class="md:max-h-1/2 rounded overflow-hidden shadow-lg mt-12 bg-gray-300 lg:w-full"
              >
                <div class="flex pt-4 items-center border-b border-blue-200 py-2 mx-6">
                  <input
                    class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 leading-tight focus:outline-none"
                    type="text"
                    id="title"
                    onChange={handleNote}
                    placeholder="New Note"
                    aria-label="Note Title"
                  ></input>
                </div>
                <div id="note-content" class="px-6 py-2 pb-8">
                  <label class="block">
                    <textarea
                      class="form-textarea mt-1 block w-full px-2 py-2"
                      rows="12"
                      id="content"
                      onChange={handleNote}
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
                    />
                  </label>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="bg-gray-600 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none"
                  disabled={!validateNote()}
                  type="submit"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BlockUi>
  );
};
export default CreateNote;
