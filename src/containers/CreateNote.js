import React, { useRef, useState } from "react";
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify";
import BlockUi from "react-block-ui";
import config from "../config";

const CreateNote = (props) => {
  const file = useRef(null);
  const [note, handleNote] = useFormFields({
    title: "",
    content: "",
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
      <div class="flex mb-4 h-screen">
        <div class="w-1/2 h-full bg-gray-400">
          <div class="max-w-full max-w-xs">
            <form class="px-16 py-8 mb-4" onSubmit={handleSubmit}>
              <div
                id="note-card"
                class="max-wm-sm rounded overflow-hidden shadow-lg mt-12 bg-gray-100"
              >
                <div id="note-content" class="px-6 py-4">
                  <div class="font-bold text-2xl pt-4">
                    {note.title ? note.title : "New Note"}
                  </div>
                  <p class="text-gray-700 text-base mt-8">
                    {note.content
                      ? note.content
                      : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="w-1/2 h-full bg-gray-500">
          <div class="max-w-full max-w-xs">
            <form class="px-16 py-8 mb-4 h-full" onSubmit={handleSubmit}>
              <div
                id="note-card"
                class="max-wm-sm min-h-128 rounded overflow-hidden shadow-lg mt-12 bg-gray-300"
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
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
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
