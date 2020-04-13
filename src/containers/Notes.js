import React, { useRef, useState, useEffect } from "react";
import BlockUi from "react-block-ui";
import { useFormFields } from "../libs/hooksLib";

import { API, Storage } from "aws-amplify";

const Notes = (props) => {
  const file = useRef(null);
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [note2, handleNote] = useFormFields({
    title: "",
    content: "",
  });

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${props.match.params.id}`);
    }
    async function onLoad() {
      try {
        const note = await loadNote();
        const { title, content } = note;
        setContent(content);
        setTitle(title);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }
    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.length > 0;
  }
  function formatFileName(str) {
    return str.replace(/^\w+-/, "");
  }
  function saveNote(note) {
    return API.put("notes", `/notes/${props.match.params.id}`, { body: note });
  }
  function deleteNote() {
    return API.del("notes", `/notes/${props.match.params.id}`);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await saveNote({
        title,
        content,
      });
      // include a toast here??
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteNote();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  return (
    <div class="note">
      {note && (
        <div class="max-w-full max-w-xs">
          <form class="px-16 py-8 mb-4 h-full" onSubmit={handleSubmit}>
            <div
              id="note-card"
              class="max-wm-sm min-h-128 rounded overflow-hidden shadow-lg mt-12 bg-gray-300"
            >
              <div class="flex pt-4 items-center border-b border-blue-200 py-2 mx-6">
                <input
                  class="appearance-none bg-transparent border-none w-full text-gray-800 py-1 leading-tight focus:outline-none"
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={title ? title : "New Note"}
                  aria-label="Note Title"
                />
              </div>
              <div class="px-6 py-2 pb-8">
                <label class="block">
                  <textarea
                    class="form-textarea mt-1 block w-full px-2 py-2"
                    rows="12"
                    id="content"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={
                      content
                        ? content
                        : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil."
                    }
                  >
                    {content}
                  </textarea>
                </label>
              </div>
            </div>
            <div class="flex justify-end">
              <BlockUi blocking={isLoading}>
                <div class="flex items-center justify-between">
                  <button
                    class="bg-gray-600 hover:bg-gray-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none"
                    disabled={!validateForm()}
                  >
                    Save
                  </button>
                </div>
              </BlockUi>
              <BlockUi blocking={isDeleting}>
                <div class="flex items-center ml-6 justify-between">
                  <button
                    class="bg-red-400 hover:bg-red-600 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none"
                    disabled={!validateForm()}
                    type="submit"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </BlockUi>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Notes;
