import React, {useRef} from 'react';
import {useStore} from "../store/store";

const Orange = () => {
    const increaseOranges = useStore((state) => state.increaseOranges)
    const setOrangesValue = useStore((state) => state.setOrangesValue)
    const orangeInput = useRef()

    return (
        <div className="border pad">
            <div className="flex flex-column pad gap10">
                <div onClick={increaseOranges} className="container">🍊 +1</div>
                <input type="number" ref={orangeInput}/>
                <button onClick={() =>setOrangesValue(Number(orangeInput.current.value))} className="btn">Set Orange value</button>
            </div>
        </div>
    );
};

export default Orange;