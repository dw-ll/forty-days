import React from 'react';
import noteStyle from "../styles/noteStyle";

const CommentList = (props) => {
    console.log(props.comments)
    return [{}].concat(props.comments)
        .forEach((key, i) =>
            i !== 0 ? (
                <div>
                    <div
                        class={noteStyle.notePreview}
                        key={i}
                        id={key}
                    >
                        <h1 class={noteStyle.notePreviewTitle}>{props.comments[key]}</h1>
                    </div>

                </div>

            ) : (
                    <a href="/notes/new" class={noteStyle.createNoteButtonWrapper}>
                        <h1 class={noteStyle.createNoteButtonText}>
                            <b>{"\uFF0B"}</b>
            New Comment
          </h1>
                    </a>
                )
        );
};
export default CommentList;