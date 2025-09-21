import React from 'react';
import {findAllByDisplayValue} from "@testing-library/dom";

const IconsResult = (props) => {


    return (
        <div className="flex flex-column">
            <div className="border margin-btm">
                <div className="flex pad gap10">
                    {/*<div className="ingredient">{props.card}</div>*/}
                    {
                        props.card.map((item, index) =>
                            <div className="ingredient">{item}!</div>
                        )}
                    <button onClick={props.deleteBtn} className="delete-btn">Delete xxxx</button>
                </div>
                <div className="pad">Time:</div>
            </div>

        </div>
    );
};

export default IconsResult;