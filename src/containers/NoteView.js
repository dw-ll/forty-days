import React, { useEffect, useState } from 'react';
import { API } from "aws-amplify";
import CommentList from './CommentList';

const NoteView = props => {
    const [note, setNote] = useState(null);
    const [currentId, setCurrentId] = useState(props.match.params.id);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [comments, setComments] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const renderComments = (id, comments) => {
        return (
            <CommentList
                comments={comments}
                id={id} />
        )
    }

    useEffect(() => {
        function loadNote() {
            return API.get("notes", `/notes/${props.match.params.id}`);
        }
        async function onLoad() {
            try {
                const note = await loadNote();
                const { title, content, comments } = note;
                setContent(content);
                setTitle(title);
                setComments(comments);
                setNote(note);
            } catch (e) {
                alert(e);
            }
        }
        onLoad();
    }, [props.match.params.id]);
    return (

        <div class='py-4 min-h-screen mx-auto bg-gray-200'>
            <div class='container items-center justify-center mx-auto max-w-1/4'>
                <div class='px-12 mb-4 sm:min-w-full '>
                    <div class='max-w-sm  max-h-1/2 rounded shadow-lg mt-12 bg-white sm:min-w-full '>
                        <div class='px-6 py-4 overflow-y-scroll'>
                            <h1 class='font-bold text-2xl pt-4 border-b'>
                                {title}
                            </h1>
                            <p class='break-words text-gray-700 text-lg text-base mt-8 '>
                                {content}
                            </p>

                        </div>
                    </div>
                </div>
                <div class='px-8 lg:px-4 mt-16'>
                    <h1 class='text-gray-600 font-bold text-3xl'>Comments</h1>
                    {renderComments(currentId, comments)}
                </div>

            </div>

        </div>



    )
}
export default NoteView;
