import React, { useState } from 'react';
import noteStyle from "../styles/noteStyle";
import Moment from 'react-moment';
import { useFormFields } from '../libs/hooksLib.js';
import { API } from "aws-amplify";
import { Notify } from "../libs/notify";


const commentsSelector = (commentsObj) => {
    return Object.keys(commentsObj)
        .map((commentKey) => commentsObj[commentKey]);
};

const CommentList = (props) => {
    const commentsList = commentsSelector(props.comments);
    commentsList.sort(function (a, b) {
        return b.createdAt - a.createdAt;
    })
    const [content, setContent] = useState("");
    const handleChange = (e) => {
        setContent(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(content);
        try {
            await sendNote(content)
            setContent("")
        } catch (err) {
            Notify.error(err.message);
            console.log(err);


        }
    }
    function sendNote(content) {
        console.log(content);
        console.log(`notes/${props.id}/comment`)
        return API.put("notes", `/notes/${props.id}/comment`, { body: { "content": content } })
    }
    return [{}].concat(commentsList).map((comment, i) =>
        i !== 0 ? (
            <>

                <div class='mx-2 overflow-y-scroll'>
                    <div
                        class={"block h-full group bg-gray-100 hover:bg-gray-300 p-4 mx-auto border-b w-full shadow-xs"}
                        key={i}
                        id={comment}
                    >
                        <div class='flex'>
                            <h1 class="break-words font-bold text-lg mb-1 text-black group-hover:text-white">{comment.comment}</h1>
                            <h1 class="break-words font-bold text-gray-700 text-sm text-black group-hover:text-white mt-1 pl-3">
                                <Moment fromNow>{comment.createdAt}</Moment>
                            </h1>
                        </div>
                    </div>

                </div>
            </>

        ) : (
                <form class="w-full max-w-sm mx-2" onSubmit={handleSubmit}>
                    <div class="flex items-center ">
                        <input
                            id='content'
                            value={content}
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            onChange={handleChange}
                            placeholder="Add a comment"
                        >
                        </input>

                    </div>
                </form>
            )
    );


};

export default CommentList;