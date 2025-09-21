import React, {useRef, useState} from "react";

const Card = (props) => {

    const colorInput = useRef()
    const textInput = useRef()
    const [getEmoji, setEmoji] = useState("")


    function pickEmoji(emoji){
        setEmoji(emoji)

    }
    function createCard(){
        const cardData = {
            emoji: getEmoji,
            color: colorInput.current.value,
            text: textInput.current.value
        }

        props.add(cardData)  ///props.add= createcard()
    }

    return (

            <div className="flex flex-column align-center pad">
                <div>
                    <div onClick={() =>pickEmoji("🥹")}
                         className="box"
                         style={{border: getEmoji === "🥹" ? "3px solid black" : "1px solid black"}}>🥹</div>
                    <div onClick={()=>pickEmoji("🐵")}
                         className="box"
                         style={{border: getEmoji === "🐵" ? "3px solid black" : "1px solid black"}}>🐵</div>
                    <div onClick={()=>pickEmoji("🍊")}
                         className="box"
                         style={{border: getEmoji === "🍊" ? "3px solid black" : "1px solid black"}}>🍊</div>
                </div>
                <input type="color" placeholder="city" ref={colorInput}/>
                <input type="text" placeholder="write something" ref={textInput}/>
                <button onClick={createCard} className="btn">Add</button>
            </div>

    )
}

export default Card