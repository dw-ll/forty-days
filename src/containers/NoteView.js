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

        <div class='py-10 mx-auto h-full bg-gray-200'>
            <div class='container items-center justify-center mx-auto max-w-1/2'>
                <div class='px-12 mb-4 sm:min-w-full '>
                    <div class='max-w-sm rounded shadow-lg mt-12 bg-white sm:min-w-full '>
                        <div class='px-6 py-4 min-h-seventy overflow-y-scroll'>
                            <h1 class='font-bold text-2xl pt-4'>
                                {title}
                            </h1>
                            <p class='text-gray-700 text-base mt-8 '>
                                {content}
                            </p>

                        </div>
                    </div>
                </div>
                <h1 class='text-gray-600 font-bold text-3xl mx-4'>Comments</h1>
                {renderComments(currentId, comments)}

            </div>

        </div>



    )
}
export default NoteView;
