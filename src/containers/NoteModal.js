import React from "react";

const NoteModal = (props) => {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
        onClick={() => props.setNoteModal(false)}
      >
        <div className="relative w-auto px-6 my-6 mx-auto max-w-3xl x:px-2">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg sm:px-2 relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">{props.note.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.setNoteModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none pl-2 pt-2">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-600 text-xl leading-relaxed">
                {props.note.content}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => props.setNoteModal(false)}
              >
                Close
              </button>

              <a
                href={`notes/${props.note.noteId}`}
                class={props.currentTab ? "hidden" : ""}
              >
                <button
                  className="bg-gray-500 hover:bg-gray-800 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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
export default NoteModal;
