import React, {useRef} from 'react';
import {useStore} from "../store/store";

const NameColor = () => {

    const colorInput= useRef()
    const nameInput = useRef()
    const addData = useStore((state) => state.addData)

    const handleData = ()=> {
    const data ={
        name: nameInput.current.value,
        color: colorInput.current.value
    }
        addData(data)
    }


    return (
        <div className="flex flex-column j-center pad gap10 border">
            <input type="color" ref={colorInput}/>
            <input type="text" placeholder="name" ref={nameInput}/>
            <button onClick={handleData} className="btn">Add</button>
        </div>
    );
};

export default NameColor;