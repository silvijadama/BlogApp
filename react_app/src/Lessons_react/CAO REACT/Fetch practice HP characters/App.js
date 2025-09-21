import logo from './logo.svg';
// import * as url from "node:url";
import './App.css';
import React, {useEffect, useRef, useState} from "react"
import Wrapper from "./Lessons_react/CAO REACT/Fetch practice HP characters/Wrapper";
import Header from "./Lessons_react/CAO REACT/Fetch practice HP characters/Header";
import CharCard from "./Lessons_react/CAO REACT/Fetch practice HP characters/CharCard";


function App() {

    const linksArray = [
        { link: "/home", title: "Home" },
        { link: "/about", title: "About" },
        { link: "/contact", title: "Contact" }
    ];

    const [getData, setData] = useState([])
    const [getCard, setCard] = useState([])
    const inputRef = useRef()

    function addCard(cardData){
        if(cardData.image === ""){
            cardData.image = "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
        }
        setCard([...getCard, cardData])
    }

    useEffect(() => {
        fetch("https://hp-api.onrender.com/api/characters")
            .then(res => res.json())
            .then(data =>{
                    console.log(data)
                    setData(data)
                }
            )
    }, []);
    return (
        <div className="App gap10">
            {
                linksArray.map((item, index)=>
                    <Header
                        link={item}/>
                )
            }

            <input type="text" ref={inputRef} placeholder="search character"></input>
            <div className="grid-container">
                {getData.map((item, index) =>

                    <Wrapper
                        key={index}
                        card={item}
                        addCard={addCard}/>
                )}
            </div>

        </div>
    );
}

export default App;

