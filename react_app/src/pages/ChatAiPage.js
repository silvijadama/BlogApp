import React, {useRef, useState} from 'react';

const ChatAiPage = () => {
    const [messages, setMessages] = useState([])

 const inputRef = useRef()

 function askQuestion(){
     const message = inputRef.current.value
     if (!message) return

     setMessages(prev => [...prev,  message ]);
     inputRef.current.value = "";

     // setMessages( [messages,  message])

    fetch("http://localhost:2500/api/chat",{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({message})
    } )
        .then(res => res.json())
        .then(data => {
            console.log("AI says:", data.answer)

            setMessages(prevMessages => [...prevMessages,  data.answer])
        })

}

    return (
        <div className="flex flex-column j-space-between gap10 pad">
            {messages.map((msg, index)=>
                <div key={index}> <br/> {msg}</div>
            )}
            <div className="flex gap10 j-center">
                <input type="text" placeholder="Type your question here" ref={inputRef}/>
                <button onClick={askQuestion} className='btn'>Submit</button>
            </div>
        </div>
    );
};

export default ChatAiPage;