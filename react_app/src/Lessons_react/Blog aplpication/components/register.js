import React, {useRef} from 'react';

const Register = (props) => {
    const userInput = useRef()
    const pswOneInput = useRef()
    const pswTwoInput = useRef()


    function register () {
        const newUser ={
            username: userInput.current.value,
            pass1: pswOneInput.current.value,
            pass2: pswTwoInput.current.value
        }

        const exists = props.users.some(user => user.username === newUser.username)
        if(exists){
            alert("Username already exists!")
            return
        }

        if(newUser.username.length > 15){
            alert("Username too long")
            return
        }

        if(newUser.username.length < 5){
            alert("Username too short")
            return
        }

        if(newUser.pass1 !== newUser.pass2 ){
            alert("Passwords don't match")
            return
        }

        if(newUser.pass1[0] !== newUser.pass1[0].toUpperCase()){
            alert("Must start with capital letter")
            return
        }

        const nums= ["0","1","2","3","4","5","6","7","8","9"]
        let hasNumber = false
        for(let num of nums){
            if(newUser.pass1.includes(num)){
                hasNumber = true
                break
            }
        }
        if(!hasNumber){
            alert("Password must contain at least one number!")
            return
        }



        props.add(newUser)
    }




    return (
        <div className="card flex flex-column pad align-center gap10">
            <input type="text" placeholder="username" ref={userInput}/>
            <input type="text" placeholder="password 1" ref={pswOneInput}/>
            <input type="text" placeholder="password 2" ref={pswTwoInput}/>
            <button onClick={register} className="btn">Register</button>

        </div>
    );
};

export default Register;