import React, {useEffect, useRef} from 'react';
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {socket} from "../socket";

const ProfileNodePage = () => {
    const [pokes, setPokes] = useState([])
    const [user, setUser] = useState(null)
    const{ id } = useParams()
    const navigate = useNavigate()
    // const [lastPoke, setLastPoke] = useState(null)

    useEffect(() => {
        console.log(id, "username using username params")
        fetch(`http://localhost:2500/api/profile/${id}`,
            {
            headers: { authorization: localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(data =>{
                console.log(data.user, "This should be single user data")
                setUser(data.user)

            })
    }, [id]);


    useEffect(() => {
            const token = localStorage.getItem("token")
            fetch("http://localhost:2500/api/pokes",
                {
                    headers: {
                        "authorization": token
                    }
                })
                .then(res=> res.json())
                .then(data =>{
                    if(data.success){
                        console.log("Users' whoo poked data:", data)
                        setPokes(data.pokes)
                    }

                })
        }, []);


    if (!user) return <p>Loading...</p>;

    function editProfile(){
        navigate(`/profile/${user._id}/edit`)
    }


    return (
        <div className="flex j-center">
            <div className="flex">
                <div key={user._id} className="card">
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                    <button onClick={editProfile} className="btn btn-primary">Edit profile</button>
                </div>
            </div>

                {/*poke history*/}
            <div className="flex flex-column">
                <h2>Poke History</h2>
                <div className="comments-container">
                    {pokes.map(user =>(
                        <div key={user._id} className="card margin-btm">
                            <div>Poked by:</div>
                            <div>{user.username}</div>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );
};

export default ProfileNodePage;