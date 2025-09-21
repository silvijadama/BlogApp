import React from 'react';

const Card2 = (props) => {

    return (
        <div className="card flex flex-column"
            style={{backgroundColor: props.card.color}}>
            <div>{props.card.emoji}</div>
            <div>{props.card.text}</div>
            <button onClick={props.deleteBtn}> Delete</button>

        </div>
    );
};

export default Card2;