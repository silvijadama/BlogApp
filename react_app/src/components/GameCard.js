import React from 'react';

const GameCard = (props) => {
    return (
        <div className="flex flex-column border align-center j-space-evenly pad">
            <img style={{width: 100}} src={props.image} alt=""/>
            <div className="progressWrapper">
                <div className="progressBar" style={{width: `${props.progress}%`}}></div>
            </div>
        </div>
    );
};

export default GameCard;