 import React, {useEffect, useRef} from 'react';
import {useNavigate, useLocation} from "react-router-dom";


const EditPostNode = ({getPosts, loggedUser}) => {
    const { state } = useLocation();
    const post = state?.getPost;
    console.log(post, "post which we want to edit")

    const imageInput = useRef()
    const titleInput = useRef()
    const contentInput = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        imageInput.current.value = post.image
        titleInput.current.value = post.title
        contentInput.current.value = post.description
    }, []);

    function updatedPost(){
        const updatedData ={
            post_id: post._id,
            image: imageInput.current.value,
            title: titleInput.current.value,
            description: contentInput.current.value
        }

        fetch("http://localhost:2500/api/edit",
            {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem("token")},
                body: JSON.stringify(updatedData)
            })
            .then(res => res.json())
            .then(data =>{
                console.log("updated post data", data)
                if(data.success){
                    navigate("/api/posts")
                    return
                }

            })
    }

    return (
        <div>
            <div className="flex flex-column align-center gap10 pad border">
                <div>user: {loggedUser?.username}  x</div>
                <input type="text" defaultValue={post.image} placeholder="image url" ref={imageInput}/>
                <input type="text" defaultValue={post.title} placeholder="title" ref={titleInput}/>
                <input type="text" defaultValue={post.description} placeholder="post content" ref={contentInput}/>
                <div>
                    {loggedUser && post.user_id === loggedUser.id && (
                        <button
                            className="btn"
                            onClick={updatedPost}>Update Post</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPostNode;