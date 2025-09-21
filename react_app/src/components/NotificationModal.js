import React from 'react';

const NotificationModal = ({lastPoke, setLastPoke}) => {
    if (!lastPoke) return null

    return (
        <div>

            {lastPoke && (
                <div className="poke-overlay">
                    <div className="poke-modal">
                        <h2>Notification</h2>
                        <p>
                            You've just been poked by <span>{lastPoke}</span>!
                        </p>
                        <button
                            onClick={() => setLastPoke(null)}
                            className="poke-button">Close</button>
                    </div>
                </div>
            )}
         </div>
    );
};

export default NotificationModal;