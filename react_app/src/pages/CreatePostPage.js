import React, {useRef} from 'react';
import { useNavigate} from "react-router-dom";

const CreatePostPage = (props) => {
    const imageInput = useRef()
    const titleInput = useRef()
    const contentInput = useRef()
    const navigate = useNavigate()

    function createPost(){

        const postData ={
            image: imageInput.current.value,
            title: titleInput.current.value,
            description: contentInput.current.value,
            username: props.users?.name || "Anonymous",
            secretKey: props.secretKey
        }

        fetch("http://156.67.83.41:1111/createpost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Created new post", data);

            });

        props.create(postData)
        console.log("This is new post", postData)
        navigate("/")
    }

    return (
        <div className="flex flex-column align-center gap10 pad border">
            <input type="text" placeholder="image url" ref={imageInput}/>
            <input type="text" placeholder="title" ref={titleInput}/>
            <div>Created by:</div>
            <input type="text" placeholder="post content" ref={contentInput}/>
            <div onClick={createPost} className="btn">Create post</div>
        </div>
    );
};

export default CreatePostPage;