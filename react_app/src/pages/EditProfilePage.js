import React, {useRef, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

const EditProfilePage = () => {

    const usernameInput = useRef()
    const emailInput = useRef()
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
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
    }, [id])

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
                    "authorization": localStorage.getItem("token")},
                body: JSON.stringify (updatedProfile)
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                navigate("/login")
            })
    }

    if (!user) return <p>Loading...</p>
    return (
        <div>
            <div className="flex flex-column align-center gap10 pad border">

                <input type="text" defaultValue={user.username} placeholder="new username" ref={usernameInput}/>
                <input type="text" defaultValue={user.email} placeholder="new email" ref={emailInput}/>

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