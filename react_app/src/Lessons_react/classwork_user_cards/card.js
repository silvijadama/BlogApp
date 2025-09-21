import React, {useRef, useState} from "react";

const Card = (props) => {

    const userInput = useRef()
    const cityInput = useRef()
    const ageInput = useRef()

    function createUser(){
        const userData = {
            username: userInput.current.value,
            city: cityInput.current.value,
            age: ageInput.current.value
        }

        props.create(userData)
    }


    return (

        <div className="flex flex-column align-center pad border">
            <input type="text" placeholder="username" ref={userInput}/>
            <input type="text" placeholder="city" ref={cityInput}/>
            <input type="text" placeholder="age" ref={ageInput}/>
            <button onClick={createUser} className="btn">Create User</button>
        </div>

    )
}

export default Card