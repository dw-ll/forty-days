import React, { useRef, useState } from "react";
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify";
import BlockUi from "react-block-ui";
import config from "../config";
import noteStyle from "../styles/noteStyle";

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
      <div class={noteStyle.createNote.wrapper}>
        <div class={noteStyle.createNote.leftHalf.wrapper}>
          <div class={noteStyle.createNote.leftHalf.formWrapper}>
            <form
              class={noteStyle.createNote.leftHalf.form}
              onSubmit={handleSubmit}
            >
              <div id="note-card" class={noteStyle.createNote.leftHalf.card}>
                <div
                  id="note-content"
                  class={noteStyle.createNote.leftHalf.contentWrapper}
                >
                  <div class={noteStyle.createNote.leftHalf.noteTitle}>
                    {note.title ? note.title : "New Note"}
                  </div>
                  <p
                    class={noteStyle.createNote.leftHalf.noteContent}
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

        <div class={noteStyle.createNote.rightHalf.wrapper}>
          <div class={noteStyle.createNote.rightHalf.formWrapper}>
            <form
              class={noteStyle.createNote.rightHalf.form}
              onSubmit={handleSubmit}
            >
              <div id="note-card" class={noteStyle.createNote.rightHalf.card}>
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
