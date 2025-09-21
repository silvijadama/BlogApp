import React, {useEffect, useRef, useState} from 'react';
import { useNavigate} from "react-router-dom";

const RegisterPage = () => {

    const userInput = useRef()
    const emailInput = useRef()
    const pswOneInput = useRef()
    const pswTwoInput = useRef()
    const navigate = useNavigate()

    function register() {
        const newUserData = {
            username: userInput.current.value,
            email: emailInput.current.value,
            passwordOne: pswOneInput.current.value,
            passwordTwo: pswTwoInput.current.value
        }


        fetch("http://localhost:2500/api/adduser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserData)
        })
            .then(res => res.json())
            .then(data => {
                console.log("this is registration", data);
                if (data.success) {
                    alert("Registration successful!");
                    navigate("/api/login")
                } else {
                    alert("Registration unsuccessful!")
                    console.log(newUserData)
                    return
                }
                navigate("/api/login")
            })

    }

    return (
        <div>
            <div className="flex flex-column pad align-center j-center gap10">
                <input type="text" placeholder="username" ref={userInput}/>
                <input type="text" placeholder="email" ref={emailInput}/>
                <input type="password" placeholder="password 1" maxLength={20} minLength={5} ref={pswOneInput}/>
                <input type="password" placeholder="password 2" maxLength={20}  minLength={5} ref={pswTwoInput}/>
                <button onClick={register} className="btn">Register</button>

            </div>
        </div>
    );
};

export default RegisterPage;