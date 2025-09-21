import React, {useRef} from 'react';

const Wrapper = (props) => {


    return (
        <div className="flex flex-column gap10 pad">
                <div className="card">
                    <img
                        style={{width: 150}}
                        src={props.card.image || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
                        alt=""
                    />
                    <p>{props.card.name}</p>
                    <p>{props.card.dateOfBirth}</p>
                </div>
        </div>
    );
};

export default Wrapper;