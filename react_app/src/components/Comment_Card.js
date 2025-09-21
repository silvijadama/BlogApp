import React from 'react';

const CommentCard = (props) => {
    return (
        <div className="card">
            <h3>{props.comment.name}</h3>
            <p>{props.comment.email}</p>
            <p>{props.comment.body}</p>
        </div>
    );
};

export default CommentCard;