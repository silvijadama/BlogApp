import React, {useRef} from 'react';

const Login = (props) => {

    const userInput = useRef()
    const pswInput = useRef()

    function login(){
        const logData ={
            username: userInput.current.value,
            password: pswInput.current.value
        }

        const userExists = props.users.find(user => user.username === logData.username)

         if(!userExists || userExists.pass1 !==logData.password){
            alert("credentials don't match!")
        return

        }

        props.log(logData)
    }

    return (
        <div>
            <div className="card flex flex-column pad align-center gap10">
                <input type="text" placeholder="username" ref={userInput}/>
                <input type="text" placeholder="password" ref={pswInput}/>
                <button onClick={login} className="btn">Login</button>

            </div>
        </div>
    );
};

export default Login;