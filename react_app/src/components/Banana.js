import React, {useRef} from 'react';
import {useStore} from "../store/store";

const Banana = () => {
    const increaseBananas = useStore((state) => state.increaseBananas)
    const setBananaValue = useStore((state) => state.setBananaValue)
    const bananaInput = useRef()

    return (
        <div className="border pad">
            <div className="flex flex-column pad gap10">
                <div onClick={increaseBananas} className="container">🍌 +1</div>
                <input type="number" ref={bananaInput}/>
                <button onClick={() =>setBananaValue(Number(bananaInput?.current.value))} className="btn">Set Banana value</button>
            </div>
        </div>
    );
};

export default Banana;