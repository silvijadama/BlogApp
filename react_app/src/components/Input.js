import React, {useRef} from 'react';

const Input = (props) => {

    const inputValue = useRef()

    function createPost(){
        const postData = inputValue.current.value
        props.create(postData)
    }
    return (
        <div className="flex flex-column  pad">
            <input type="text" ref={inputValue} placeholder="type something"/>
            <button onClick={createPost} className="btn">Add</button>
        </div>
    );
};

export default Input;