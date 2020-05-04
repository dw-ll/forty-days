import React, { useEffect, useState } from 'react';
import { API } from "aws-amplify";
import CommentList from './CommentList';

const NoteView = props => {
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [comments, setComments] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const renderComments = (comments) => {
        return (
            <CommentList
                comments={comments} />
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

        <div class='py-10  h-full bg-gray-200'>
            <div class='container items-center justify-center max-w-1/2'>
                <div class='px-12 mb-4 sm:min-w-full '>
                    <div class='max-w-sm rounded shadow-lg mt-12 bg-white sm:min-w-full '>
                        <div class='px-6 py-4 overflow-y-scroll'>
                            <h1 class='font-bold text-2xl pt-4'>
                                {title}
                            </h1>
                            <p class='text-gray-700 text-base mt-8 '>
                                {content}
                            </p>

                        </div>
                    </div>
                </div>
                <h1 class='text-gray-600 text-2xl mx-2'>Comments</h1>
                {renderComments(comments)}

            </div>

        </div>



    )
}
export default NoteView;
