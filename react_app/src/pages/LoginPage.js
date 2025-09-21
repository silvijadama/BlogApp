import React, {useEffect, useRef} from 'react';
import { useNavigate} from "react-router-dom";
import {useStore} from "../store/store"
const LoginPage = (props) => {

    const userInput = useRef()
    const pswInput = useRef()
    const navigate = useNavigate()

    function login(){

        const logData = {
            name: userInput.current.value,
            password: pswInput.current.value,
            secretKey: props.secretKey
        }
        console.log("this is login data", logData)

            fetch("http://156.67.83.41:1111/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logData)
            })
                .then(res => res.json())
                .then(data =>{
                    console.log(data)
                    if (data.success) {
                        props.log({ name: logData.name, secretKey: data.secretKey });
                        navigate("/createpost")
                        props.secretKey(data.secretKey)
                    }
                })
    }

    return (
        <div>
            <div className="flex flex-column pad align-center gap10">
                <input type="text" placeholder="username" ref={userInput}/>
                <input type="text" placeholder="password" ref={pswInput}/>
                <button onClick={login} className="btn">Login</button>

            </div>
        </div>
    );
};

export default LoginPage;