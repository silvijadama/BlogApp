import React, {useState} from 'react';

const IconsGrid = (props) => {

    const emojiObject = [
        { name: "smile", emoji: "😊" },
        { name: "heart", emoji: "❤️" },
        { name: "thumbsUp", emoji: "👍" },
        { name: "fire", emoji: "🔥" },
        { name: "star", emoji: "⭐" },
        { name: "sun", emoji: "☀️" },
        { name: "moon", emoji: "🌙" },
        { name: "flower", emoji: "🌸" },
        { name: "cat", emoji: "🐱" },
        { name: "dog", emoji: "🐶" },
        { name: "pizza", emoji: "🍕" },
        { name: "burger", emoji: "🍔" },
        { name: "soccer", emoji: "⚽" },
        { name: "guitar", emoji: "🎸" },
        { name: "camera", emoji: "📷" },
        { name: "airplane", emoji: "✈️" },
        { name: "rocket", emoji: "🚀" },
        { name: "tree", emoji: "🌳" },
        { name: "ocean", emoji: "🌊" },
        { name: "rainbow", emoji: "🌈" }
];
    const [getEmojiArr, setEmojiArr] = useState([])
    // const [getTime, setTime] = useState("")

    function addEmojis(emoji){

        setEmojiArr(emojiData =>{
            let updatedArr = emojiData.includes(emoji)
                ? emojiData.filter(e => e !== emoji) :
                [...emojiData, emoji]

            return updatedArr
    })}

    function submitEmojis(){
        // const time= Date.now()
        props.add(getEmojiArr)
        setEmojiArr([])
    }




    return (
        <div className="ingredient-grid">
            {emojiObject.map((icon, index) =>(
                <div className="ingredient flex j-center align-center"
                     key={index}
                     onClick={()=> addEmojis(icon.emoji)}
                     style={{border: getEmojiArr.includes(icon.emoji) ? "3px solid black" : "1px solid black"}}>

                    {icon.emoji}
                </div>
            ))}
            <button className="btn" onClick={submitEmojis}>Add</button>
        </div>
    );
};

export default IconsGrid;