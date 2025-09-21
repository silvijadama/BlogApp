import logo from './logo.svg';
import './App.css';
import React, {useState, useRef} from "react"
// import * as url from "node:url";
import Card from "./components/card.js";
import SingleUser from "./components/SingleUser";
function App() {


    const [getNewUser, setNewUser] = useState([])

    function addUser(userData){
        setNewUser([...getNewUser, userData])
    }


    return (
        <div className="App flex j-space-evenly gap10">
            <div>
                <Card create={addUser}/>
            </div>
            <div className="flex flex-column gap10 box">
                {
                    getNewUser.map((user, index) =>
                        <SingleUser key={index} user={user}/>
                    )
                }
            </div>
        </div>
    );
}

export default App;

