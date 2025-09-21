import React from 'react';

const ProgressBar = (props) => {
    return (
        <div>
            <div className="progressWrapper">
                <div className="progressBar"
                    style={{width: `${props.progress}%`}}></div>
            </div>
        </div>
    );
};

export default ProgressBar;