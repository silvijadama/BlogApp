import React, {useEffect, useRef, useState} from 'react';
import { useNavigate} from "react-router-dom";

const RegisterPage = (props) => {

    const userInput = useRef()
    const pswOneInput = useRef()
    const pswTwoInput = useRef()
    const [getUser, setUser] = useState(null)
    const navigate = useNavigate()

    function register() {
        const newUserData = {
            name: userInput.current.value,
            passwordOne: pswOneInput.current.value,
            passwordTwo: pswTwoInput.current.value
        }
        const userExists = props.user.some(user => user.name === newUserData.name)
        if (userExists) {
            alert("Username already exists!")
            return
        }
        if (newUserData.passwordOne !== newUserData.passwordTwo) {
            alert("Passwords don't match!")
            return
        }

        fetch("http://156.67.83.41:1111/createaccount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUserData)
        })
            .then(res => res.json())
            .then(data => {
                console.log("this is registration", data);
                if (data.success) {
                    props.addUser(newUserData);
                    props.secretKey(data.secretKey);
                    alert("Registration successful!");
                    // navigate("/LoginPage")
                } else {
                    alert("Registration successful!")
                    console.log(newUserData)
                }
                props.addUser(newUserData)
                navigate("/login")
            })

    }

    return (
        <div>
            <div className="flex flex-column pad align-center gap10">
                <input type="text" placeholder="username" ref={userInput}/>
                <input type="text" placeholder="password 1" ref={pswOneInput}/>
                <input type="text" placeholder="password 2" ref={pswTwoInput}/>
                <button onClick={register} className="btn">Register</button>

            </div>
        </div>
    );
};

export default RegisterPage;