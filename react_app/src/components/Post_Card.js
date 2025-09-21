import React from 'react';

const PostCard = (props) => {
    function likePost(){
        console.log("like",props.post )
        props.post.likes.push(props.currentUser)

    }

    return (
        <div className="card">
            <img src={props.post.image} alt=""/>
            <h3>{props.post.title}</h3>
            <p>Created by: {props.post.owner}</p>
            <button onClick={likePost} className="btn">Likes</button>
            <div>{props.countLikes}</div>
        </div>
    );
};

export default PostCard;