import logo from './logo.svg';
import './App.css';
import React, {useState, useRef} from "react"
// import * as url from "node:url";
import Card from "./components/card.js";
function App() {

    const colorInput1 = useRef()
    const colorInput2 = useRef()
    const colorInput3 = useRef()
    const [getColor, setColor] = useState("pink")




    function pickColor(inputRef){
        const  newColor = inputRef.current.value
        setColor(newColor)

    }

    return (
        <div className="App">
            <div className="box" style={{backgroundColor: getColor}}>Color</div>
            <Card color={() => pickColor(colorInput1)} colorInput={colorInput1}/>
            <Card color={() => pickColor(colorInput2)} colorInput={colorInput2}/>
            <Card color={() => pickColor(colorInput3)} colorInput={colorInput3}/>

        </div>
    );
}

export default App;

