import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from "react"
// import * as url from "node:url";
import GameCard from "./components/GameCard";
import {findAllByDisplayValue} from "@testing-library/dom";
import gameCard from "./components/GameCard";





function App() {

    const [getPlayerProgress, setPlayerProgress] = useState(100)
    const [getMonsterProgress, setMonsterProgress] = useState(100)
    const [getMoney, setMoney] = useState(0)
    const playerImg = "https://cdn5.vectorstock.com/i/1000x1000/84/69/pixel-character-man-waving-hand-and-smiling-vector-26568469.jpg"
    const monsterImg = "https://img.freepik.com/premium-vector/cartoon-monster-pixel-design_61878-706.jpg"
    const [getMessage, setMessage] = useState ("")
    const [getGameOver, setGameOver] = useState(true)

    function attack(){
        if (getGameOver) return

        let playerAttack = Math.floor(Math.random() * 10)
        console.log("Player damage to monster", playerAttack)
        let monsterAttack = Math.floor(Math.random() * 5)
        let playerMoney = Math.floor(Math.random() * 10)
        setMonsterProgress(getMonsterProgress - playerAttack)
        setPlayerProgress(getPlayerProgress - monsterAttack)
        setMoney(getMoney + playerMoney)
    }


    function buyPotion(){
        const potionPrice = 20
        if(getMoney >=20)
            setMoney(getMoney - potionPrice)
        setPlayerProgress(100)
    }
    function startGame(){
        setPlayerProgress(100);
        setMonsterProgress(100);
        setMoney(0);
        setMessage("");
        setGameOver(false);
    }

    useEffect(() => {
        if(getPlayerProgress === 0){
            setMessage("You loose!")
            setPlayerProgress(0)
            setGameOver(true);
        } else if (getMonsterProgress <=0){
            setMessage("You win!")
            setMonsterProgress(0)
            setGameOver(true);
        }
    }, [getPlayerProgress, getMonsterProgress]);

    return (
        <div className="App flex j-center gap10">
            <GameCard
                image={playerImg}
                progress={getPlayerProgress}/>
            <div className="card flex flex-column gap10 align-center">
                <h1>{getMessage}</h1>
                <h3>Money: {getMoney}</h3>
                <button onClick={attack} className="btn">Attack</button>
                <img style={{width: 100}} src="https://i.etsystatic.com/43201484/r/il/9b67d5/5504177596/il_fullxfull.5504177596_tc23.jpg" alt=""/>
                <button onClick={buyPotion} className="btn">Buy Potion</button>
                <button onClick={startGame} className="btn">Start Game</button>
            </div>
            <GameCard
                image={monsterImg}
                progress={getMonsterProgress}/>

        </div>

    );
}

export default App;

