import React, {useRef, useState} from 'react';

const InputPracticePage = () => {

    const inputRef = useRef()
    const [getWord, setWord] = useState([])


    function filter(randomWord){
        return randomWord.split("").filter((_, index) => index%2 === 0 ).join("")

    }

    function addWord(){
        const inputWord = inputRef.current.value
        setWord([...getWord, filter(inputWord)])
        console.log(inputWord)
        inputRef.current.value = ""
    }


    return (
        <div className="flex gap10 j-center">
            <div className="flex flex-column  pad gap10">
                <input type="text"  placeholder="type something" ref={inputRef}/>
                <button onClick={addWord} className="btn">Add</button>
            </div>
            <div className="flex pad border margin-btm gap10">
                <p>{getWord}</p>
            </div>
        </div>
    );
};

export default InputPracticePage;