import React from 'react';
import {useStore} from "../store/store";

const DataCard = () => {
    const data = useStore((state)=> state.data)

    return (
        <div className="container flex flex-column gap10 pad border">
            {data.map((item, index) =>
                <div className="container"
                     key={index}
                     style={{backgroundColor: item.color}}>{item.name}</div>
            )}

        </div>
    );
};

export default DataCard;