import React, {useRef} from 'react';
import {useStore} from "../store/store";

const Apple = () => {

    const increaseApples = useStore((state) => state.increaseApples)
    const setAppleValue = useStore((state) => state.setAppleValue)
    const appleInput = useRef()


    return (
    <div className="border pad">
        <div className="flex flex-column pad gap10">
            <div onClick={increaseApples} className="container">🍎 +1</div>
            <input type="number" ref={appleInput}/>
            <button onClick={() =>setAppleValue(Number(appleInput?.current.value))} className="btn">Set Apple value</button>
        </div>
    </div>
    );
};

export default Apple;