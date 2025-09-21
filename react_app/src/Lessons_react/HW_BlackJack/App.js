import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from "react"
// import * as url from "node:url";
import BJ_Cards from "./components/BJ_Cards";



function App() {

    const [getDeck, setDeck] = useState(null)
    const [getCards, setCards] = useState([])
    const [getPoints, setPoints] = useState(0)
    const [getMessage, setMessage] = useState("")

    const [getButtonDisabled, setButtonDisabled] = useState(false);

    const disableButton = () => {
        setButtonDisabled(true);
    };

    const enableButton = () => {
        setButtonDisabled(false);
        alert("Button has been enabled!");
    };


    function startGame(){
        setCards([])
        setPoints(0)
        setMessage("")
        fetch("https://www.deckofcardsapi.com/api/deck/8x5xzmn8r0nq/draw/?count=2")
            .then(res => res.json())
            .then(data =>{
                countPoints(data)
            })
    }

    function getCardPoints(card){
        if(card.value === "JACK") return 10
        if(card.value === "QUEEN") return 10
        if(card.value === "KING") return 10
        if(card.value === "ACE") return 10
        return Number(card.value)
    }

    function drawCard() {
        fetch("https://www.deckofcardsapi.com/api/deck/8x5xzmn8r0nq/draw/?count=1")
            .then(res => res.json())
            .then(data => {
                countPoints(data)
            })
    }

    function countPoints(data) {
        setCards(prevCards =>[...prevCards, ...data.cards])

        const newPoints = data.cards
            .map(card => getCardPoints(card))
            .reduce((total, value) => total + value, 0)
        // const totalPoints = getPoints + newPoints

        setPoints(prevPoints =>prevPoints + newPoints)
        const totalPoints = getPoints + newPoints
        if(totalPoints < 21){
            setMessage("Draw one more card!")
        }
        else if(totalPoints === 21){
            setMessage("You win!")
            disableButton()

        } else {
            setMessage("You loose!")
            disableButton()
        }
    }



    useEffect(() => {
        fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then(res => res.json())
            .then(data =>{
                setDeck(data)

            })
    }, []);



    return (
        <div className="App">
            <div className="flex j-center gap10 pad">
                {
                    getCards.map((card, index) =>
                        <BJ_Cards
                            key={index}
                            card={card}
                        />
                    )
                }

            </div>


            <div>Total points:{getPoints}</div>
            <div>{getMessage} </div>
            <button onClick={startGame} className="btn">Start Game</button>
            <button onClick={drawCard} className="btn" disabled={getButtonDisabled}>Draw Another Card</button>
        </div>
    );
}

export default App;

