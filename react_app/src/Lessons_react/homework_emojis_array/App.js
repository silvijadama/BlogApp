import logo from './logo.svg';
import './App.css';
import React, {useState, useRef} from "react"
// import * as url from "node:url";
import IconsGrid from "./components/IconsGrid"
import IconsResult from "./components/IconsResult"


function App() {

    const [getNewEmojis, setNewEmojis] = useState([])

    function addNewList(emojiData){
        setNewEmojis(prev =>[...prev, emojiData])
    }
    function deleteEmojis(index){
        let emojisToDelete = getNewEmojis.filter((item, i) => i !== index)
        setNewEmojis(emojisToDelete)
    }

    return (
        <div className="App flex gap10 pad border">
            <div>
                <IconsGrid add={addNewList} />
            </div>

            <div className="flex flex-column">
                {
                    getNewEmojis.map((item, index) =>
                        <IconsResult
                            key={index}
                            card={item}
                            deleteBtn={() => deleteEmojis(index)}/>
                    )}
                <div>
                </div>
            </div>

        </div>
    );
}

export default App;

