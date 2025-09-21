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

    // useEffect(() => {
    //
    //     socket.on("userWhoPokedYou", (userWhoPokedSomeone) =>{
    //         console.log("This is users who poked another user array:", userWhoPokedSomeone)
    //         setPokes(prev => [...prev, { username: userWhoPokedSomeone.username, _id: Date.now() }])
    //
    //         setLastPoke(userWhoPokedSomeone.username)
    //         setTimeout(() => setLastPoke(null), 5000)
    //     })
    //     return () => socket.off("userWhoPokedYou")
    // }, []);

    if (!user) return <p>Loading...</p>;

    function editProfile(){
        navigate(`/profile/${user._id}/edit`)
    }


    return (
        <div className=" flex j-space-between gap10 pad">
                <div key={user._id} className="card">
                    <div>Username: {user.username}</div>
                    <div>Email: {user.email}</div>
                    <button onClick={editProfile} className="btn btn-primary">Edit profile</button>
                </div>



                {/*poke history*/}
                <div>
                    <h2>Poke History</h2>
                    {pokes.map(user =>(
                        <div key={user._id} className="flex j-space-between pad card margin-btm">
                            <div>User:</div>
                            <div>{user.username}</div>
                        </div>
                    ))}
                </div>
        {/*    end poke history div*/}

        </div>
    );
};

export default ProfileNodePage;