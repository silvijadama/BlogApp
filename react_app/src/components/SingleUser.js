import React from 'react';

const SingleUser = (props) => {
    return (

            <div className="flex flex-column border">
                <p>{props.user.username}</p>
                <p>{props.user.city}</p>
                <p>{props.user.age}</p>
            </div>

    );
};

export default SingleUser;