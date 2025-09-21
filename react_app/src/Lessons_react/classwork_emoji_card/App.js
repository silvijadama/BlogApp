import logo from './logo.svg';
import './App.css';
import React, {useState, useRef} from "react"
// import * as url from "node:url";
import Card from "../../components/card";
import Card2 from "../../components/Card2";
function App() {


    const [getNewCard, setNewCard] = useState([])

    function addCard(cardData){
        setNewCard([...getNewCard, cardData])
    }
    function deleteCard(index){
        let cardToDelete = getNewCard.filter((item, i) => i !== index )
        setNewCard(cardToDelete)
    }


    return (
        <div className="App flex j-center gap10">

            {/*/////add=props.add(cardData) form Card component///*/}
            <Card add={addCard}/>
            {
                getNewCard.map((card, index)=>

                    // card = props from Card2 component ///
                    <Card2 key={index} card={card}
                           deleteBtn={() => deleteCard(index)}/>
                )
            }

        </div>
    );
}

export default App;

