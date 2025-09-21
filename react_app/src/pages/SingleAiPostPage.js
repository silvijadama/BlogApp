import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";

const SingleAiPostPage = () => {

    const { postId } = useParams();   //  get postId from URL
    const commentInput = useRef();
    const [data, setData] = useState(null);


    useEffect(() => {
        console.log(postId, "post ID using params")
        fetch(`http://localhost:2500/api/posts/id/${postId}`)
            .then(res => res.json())
            .then(data =>{
                setData(data.post)
                console.log(data.post, "this is a single post")
            })
    }, [postId]);

    if (!data) return <p>Loading...</p>;


    function addComment(){
        const token = localStorage.getItem("token")
        const comment = commentInput.current.value

        if(!comment) return

        fetch(`http://localhost:2500/api/posts/id/${postId}/comment`,
            {
                method: "POST",
                headers: {"Content-type": "application/json", "authorization": token},
                body: JSON.stringify({text: comment})
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    setData(data.post)
                    console.log("comment added successfully", data.comment)
                }else {
                    alert(data.message || "Error adding comment");
                }
            })

    }

    return (
        <div className="flex j-center gap10">
            <div className="card pad">
                <img src={data.image} alt="Post Image" className="post-image"/>
                <div className="post-content">
                    <p  className="post-user">Posted by: <span>{data.username}</span></p>
                    <p className="post-description margin-btm">{data.description}</p>
                    <div className="flex j-space-between gap10">
                        <input type="text" placeholder="add comment" ref={commentInput}/>
                        <button onClick={addComment} className="btn btn-secondary">Comment!</button>
                    </div>
                </div>
            </div>



            <div className="flex flex-column gap10 pad">
                <h2>Comments</h2>
                {data.comments.map((com, index) =>
                    <div key={index} className="card pad">
                        <p>{com.text}</p>
                        <p>Commented by: {com.username}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleAiPostPage;