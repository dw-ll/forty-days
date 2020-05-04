import React from "react";
import noteStyle from "../styles/noteStyle";

const NoteList = (props) => {
  return [{}].concat(!props.currentTab ? props.notes : props.allNotes)
    .map((note, i) =>
      i !== 0 ? (
        <div>
          {props.noteModal && props.renderModal(props.currentNote)}
          <a href={`notes/${note.noteId}`}>
            <div
              class={noteStyle.notePreview}
              key={i}
              id={note}
            >
              <h1 class={noteStyle.notePreviewTitle}>{note.title}</h1>
              <p class={noteStyle.notePreviewContent}>
                {note.content.trim().split("\n")[0].substr(0, 50)}
               ...
            </p>
              <p class={noteStyle.notePreviewTimestamp}>
                Written: {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          </a>
        </div>

      ) : (
          <a href="/notes/new" class={noteStyle.createNoteButtonWrapper}>
            <h1 class={noteStyle.createNoteButtonText}>
              <b>{"\uFF0B"}</b>
            New Note
          </h1>
          </a>
        )
    );
};
export default NoteList;
