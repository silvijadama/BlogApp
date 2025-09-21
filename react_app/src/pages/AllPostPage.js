import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

    const AllPostPage = (props) => {

    const navigate = useNavigate()


    useEffect(() => {
        fetch("http://156.67.83.41:1111/getallposts")
            .then(res => res.json())
            .then(data =>{
                    console.log(data, "all posts")
                    props.renderPosts(data.data)
                }
            )
    }, []);

    function userPosts(name){

        fetch(`http://156.67.83.41:1111/getuserposts/${name}`,  {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })

    .then(res => res.json())
            .then(data => {
                console.log("Get all users posts ", data)
                props.setUsersPosts(data.data)
                navigate("/AllUserPostPage")
            })

    }

    function singlePost(name, id) {
        console.log("username:", name, "id:", id)
        fetch(`http://156.67.83.41:1111/getsinglepost/${name}/${id}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })

            .then(res => res.json())
            .then(data => {
                console.log("Get single posts ", data)
                props.singlePost(data.data)
                navigate("/SinglePostPage")
            })
    }

    function deletePost(id){
        console.log("post to delete", id)


        fetch(`http://156.67.83.41:1111/deletepost/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                secretKey: props.secretKey})
    })
            .then(res => res.json())
            .then(data =>{
                console.log("data to delete", data)
                const updatedPosts = props.posts.filter(post => post.id !== id)
                props.renderPosts(updatedPosts)
    })
    }

    return (
        <div className="grid-container">
            {props.posts.map((post, index)=>
                <div className="post-card"  key={index}>
                    <img src={post.image} alt="Post Image" className="post-image"/>
                    <div className="post-content">
                        <h2 className="post-title">{post.title}</h2>
                        <p onClick={() =>userPosts(post.username)} className="post-user">Posted by: <span>{post.username}</span></p>
                        <p className="post-description">{post.description}</p>
                        <button onClick={()=>singlePost(post.username, post.id)}>View Post</button>
                        <button onClick={() =>deletePost(post.id)}>Delete</button>
                    </div>
                </div>

            )}

        </div>
    );
};

export default AllPostPage;