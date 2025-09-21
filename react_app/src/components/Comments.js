import React from 'react';

const Comments = (props) => {

    function addComment(){
        props.add(props.comment.id)
    }

    return (
        <div className="card">
            <div onClick={addComment}>{props.comment.body}</div>
        </div>
    );
};

export default Comments;