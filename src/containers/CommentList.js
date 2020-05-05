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
                <div class='overflow-y-scroll'>
                    <div
                        class={"block h-full group bg-gray-100 hover:bg-gray-300 p-4 mx-auto border-b w-full shadow-xs"}
                        key={i}
                        id={comment}
                    >
                        <div class='block sm:flex'>
                            <p class="break-words font-bold text-lg text-black group-hover:text-white py-1">{comment.comment}</p>
                            <p class="break-words font-bold text-gray-700 text-sm text-black group-hover:text-white sm:pl-3 py-2">
                                <Moment fromNow>{comment.createdAt}</Moment>
                            </p>
                        </div>
                    </div>
                </div>
            </>

        ) : (
                <form class="w-full max-w-md " onSubmit={handleSubmit}>
                    <div class="">
                        <textarea
                            value={content}
                            class="shadow hover:shadow-lg appearance-none border rounded w-full pt-3 px-3 text-gray-700 leading-tight focus:outline-none"
                            type="text"
                            onChange={handleChange}
                            rows={4}
                            placeholder="Add a comment"
                        >
                        </textarea>
                        <input type="text" style={{ display: "none" }} />
                        <div class='flex bg-gray-300 py-2 px-1 justify-start mb-1 rounded'>
                            <button class="xs:w-full h-full flex-shrink-0 bg-gray-500 hover:bg-gray-700 py-2 text-sm text-white px-2 rounded" type="button" onClick={handleSubmit} disabled={!content}>
                                Comment
                        </button>
                        </div>


                    </div>
                </form>
            )
    );


};

export default CommentList;