import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {socket} from "../socket";



const SingleUserPage = ({loggedUser}) => {

    const{ username } = useParams()
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState([])
    // const [lastPoke, setLastPoke] = useState(null)
    // const [pokes, setPokes] = useState([])



    useEffect(() => {
        console.log(username, "username using username params")
        fetch(`http://localhost:2500/api/allusers/${username}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data.user, "This should be single user data")
                setUser(data.user)
            })
    }, [username]);



    useEffect(() => {
        fetch(`http://localhost:2500/api/posts/user/${username}`)
            .then(res=> res.json())
            .then(data =>{
                console.log(data.posts, "All posts of single user")
                setPosts(data.posts)

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

    function poke(pokedUserId){
        const token = localStorage.getItem("token")

        fetch("http://localhost:2500/api/poke", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({ pokedUserId })
        })
        console.log(pokedUserId, "this is poked user after button click")
        socket.emit("pokeUser", user.username)
        console.log(`${loggedUser?.username} poked ${user.username}` )
    }

    return (
        <div className="flex flex-column gap10 align-center">

            <div>
                <div className="grid-container">
                    <div className="card pad">
                        <div className="post-content">
                            <p  className="post-user">Username: <span>{user.username}</span></p>
                            <p className="post-user margin-btm">User email: <span>{user.email}</span></p>
                            <button onClick={() =>poke(user._id)} className="btn"
                                    disabled={loggedUser && loggedUser.id === user._id}>Poke!</button>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className="grid-container">
                    {posts.map((post, index) =>
                        <div className="card border pad"  key={index}>
                            <img src={post.image} alt="Post Image" className="post-image"/>
                            <div className="post-content">
                                <h3 className="post-title">{post.username}'s question: <span>{post.question}</span></h3>
                                <p></p>
                                <br/>
                                <h3 className="post-title">{post.username}'s mood: <span>{post.mood}</span></h3>
                                <br/>
                                <div className="answer">
                                    <h2>AI answer:</h2>
                                    <p className="post-description pad">{post.description}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SingleUserPage;