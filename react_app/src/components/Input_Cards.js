import React from 'react';

const InputCards = (props) => {
    return (
            <div className="flex flex-column pad border margin-btm">
                <div>{props.post.value}</div>
                <div>{props.post.time}</div>
            </div>
    );
};

export default InputCards;