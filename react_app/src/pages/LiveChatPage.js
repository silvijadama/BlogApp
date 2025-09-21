import React, {useEffect, useRef, useState} from 'react';
import {socket} from "../socket";

const LiveChatPage = ({loggedUser}) => {
    const [messages, setMessages] = useState([])
    const [msgInput, setMsgInput] = useState("")
    const messageEndInput = useRef(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        if(loggedUser){
            // get logged username from server//
            socket.emit("userConnected", loggedUser.username)
        }
        socket.on("onlineUsersUpdated", (newUser) =>{
            console.log("connected users list:", newUser)
            setOnlineUsers(newUser)
        })
        socket.on("chatMessageToBrowser", (data)=>{
            setMessages((prev) => [...prev, data])
        })
        return () => {
            socket.off("chatMessageToBrowser" )
        }
    }, [loggedUser]);

    useEffect(() => {
        messageEndInput.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function sendMessage(){

        socket.emit("chatMessageToServer", {username: loggedUser.username, message: msgInput});
            setMsgInput("")
    }

    return (
        <div id="chat-wrapper">

            <main className="container">
                <section className="chat-wrap">
                    <section className="chat-panel card">
                        <h3> Live Chat  💬</h3>

                        <div id="messages" className="messages" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className="msg">
                                    <strong>{msg.username}</strong>: {msg.message}{" "}
                                    <span style={{ fontSize: "0.8em", color: "#666" }}>
                                        ({new Date(msg.time).toLocaleTimeString()})
                                    </span>
                                </div>
                            ))}
                            <div ref={messageEndInput}></div>
                        </div>
                        <div className="chat-controls">
                            <input id="msgInput" className="msg-input" placeholder="Type a message and press Enter..."
                                   value={msgInput}
                                   aria-label="Message input"
                                   onChange={(e) => setMsgInput(e.target.value)}/>

                            <button onClick={sendMessage} id="sendBtn" className="btn btn-primary">Send</button>
                        </div>
                        <div className="small margin-btm" style={{textAlign:"left", marginTop:"8px"}}>
                            <span className="typing" id="typingIndicator"
                                  style={{display:"none"}}>Other is typing...</span>
                        </div>
                    </section>

                    <section className="chat-panel card">
                        <h3>Online users</h3>

                        <div  className="messages" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            {onlineUsers.map((user, index) => (
                                <div key={index} className="msg">
                                    <div>🟢 {user.username}</div>
                                </div>
                            ))}
                        </div>
                    </section>


                </section>
            </main>
        </div>
    );
};

export default LiveChatPage;