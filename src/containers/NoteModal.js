import React from "react";

const NoteModal = (props) => {
  return (
    <>
      <div
        class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden outline-none focus:outline-none flex justify-center items-center animated fadeIn fase"
        onClick={() => props.setNoteModal(false)}
      >
        <div class="border border-gray-600 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div class="modal-content py-4 text-left px-6">
            <div class="flex justify-between items-center pb-3">
              <h1 class="text-2xl font-bold border-b w-full">
                {props.note.title}
              </h1>
              <div class="modal-close cursor-pointer z-50"></div>
            </div>

            <div class="my-5 text-gray-700 text-xl leading-relaxed overflow-scroll border-b w-full">
              <p style={{ whiteSpace: "pre-wrap" }}>{props.note.content}</p>
            </div>

            <div class="flex justify-end pt-2">
              <button
                class="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                onClick={() => props.setNoteModal(false)}
              >
                Cancel
              </button>
              <a
                href={`notes/${props.note.noteId}`}
                class={props.currentTab ? "hidden" : ""}
              >
                <button class="focus:outline-none px-4 bg-gray-500 p-3 ml-3 rounded-lg text-white hover:bg-gray-800">
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

export default NoteModal;
