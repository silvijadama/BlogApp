import React, {useEffect, useRef} from 'react';
import { useNavigate} from "react-router-dom";
import {useStore} from "../store/store"
const LoginPage = (props) => {

    const emailInput = useRef()
    const pswInput = useRef()
    const navigate = useNavigate()

    function login(){

        const loginData = {
            email: emailInput.current.value,
            password: pswInput.current.value,

        }
        console.log("this is login data", loginData)


        fetch("http://localhost:2500/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(data =>{
                console.log("Login data:", data)

                if (data.success) {
                    localStorage.setItem("token", data.token)

                    props.setLoggedUser(data.user)
                    console.log("current logged in user:", props.loggedUser)
                    alert("logged in successfully!")
                    navigate("/posts")
                    return
                }
                else {
                    alert(data.message)
                }

            })
    }

    return (
        <div>
            <div className="flex flex-column pad align-center j-center gap10">
                <input type="text" placeholder="email" ref={emailInput}/>
                <input type="text" placeholder="password" ref={pswInput}/>
                <button onClick={login} className="btn">Login</button>

            </div>
        </div>
    );
};

export default LoginPage;