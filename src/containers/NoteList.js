import React from "react";

const NoteList = (props) => {
  return [{}]
    .concat(!props.currentTab ? props.notes : props.allNotes)
    .map((note, i) =>
      i !== 0 ? (
        <div>
          {props.noteModal && props.renderModal(props.currentNote)}

          <div
            onClick={() => {
              props.toggleNoteModal(note);
            }}
            class="block group hover:bg-gray-300 p-4 border-b w-full cursor-pointer"
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
export default NoteList;
