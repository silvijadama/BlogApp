import React from 'react';
import {useStore} from "../store/store"

const BearCounter = () => {

    const increasePopulation = useStore((state) => state.increasePopulation)
    const updateBears = useStore(state => state.updateBears)
    const removeAllBears = useStore(state => state.removeAllBears)

    return (
        <div>
            <button onClick={increasePopulation}>Increase population</button>
            <button onClick={removeAllBears}>Remove bears</button>
        </div>
    );
};

export default BearCounter;