import React, {useRef, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const EditProfilePage = ({loggedUser, setLoggedUser}) => {

    const usernameInput = useRef()
    const emailInput = useRef()
    // const {id} = useParams()


    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedUser){
            return
        }
        const id = loggedUser.id
        const token = localStorage.getItem("token")
        fetch(`http://localhost:2500/api/profile/${id}`, {
            headers: { "authorization": token }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user)
                }
            })
    }, [loggedUser])

    function updateProfile(){
        const updatedProfile = {
            username: usernameInput.current.value,
            email: emailInput.current.value
        }

        const token = localStorage.getItem("token")
        fetch("http://localhost:2500/api/profile/edit",
            {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                    "authorization": token},
                body: JSON.stringify (updatedProfile)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                // let currentLoggedUser = loggedUser
                // currentLoggedUser.username = updatedProfile.username
                // currentLoggedUser.email = updatedProfile.email
                // setLoggedUser(currentLoggedUser)
                localStorage.clear()
                setLoggedUser (null)
                navigate("/login")
            })
    }

    if (!loggedUser) return <p>Loading...</p>
    if (!user) return <p>Loading...</p>
    return (
        <div>
            <div className="flex flex-column align-center gap10 pad border">
                <div>
                    <input type="text" defaultValue={user.username} placeholder="new username" ref={usernameInput}/>
                    <input type="text" defaultValue={user.email} placeholder="new email" ref={emailInput}/>
                </div>
                <div>
                        <button
                            className="btn"
                            onClick={updateProfile}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;