import React from "react";
import noteStyle from "../styles/noteStyle";

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
            class={noteStyle.notePreview}
            key={i}
            id={note}
          >
            <p class={noteStyle.notePreviewTitle}>{note.title}</p>
            <p class={noteStyle.notePreviewContent}>
              {note.content.trim().split("\n")[0]}
            </p>
            <p class={noteStyle.notePreviewTimestamp}>
              Written: {new Date(note.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <a href="/notes/new" class={noteStyle.createNoteButtonWrapper}>
          <p class={noteStyle.createNoteButtonText}>
            <b>{"\uFF0B"}</b>
            Create a new note
          </p>
        </a>
      )
    );
};
export default NoteList;
