import React, {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";


const AllPostNode = ({setPosts, getPosts, loggedUser}) => {

    const navigate = useNavigate()
    const [sortOrder, setSortOrder] = useState("")
    const [allUsers, setAllUsers] = useState([])


    useEffect(() => {
        fetch(`http://localhost:2500/api/posts?sort=${sortOrder}`)
            .then(res => res.json())
            .then(data =>{
                setPosts(data.posts)
                console.log(data.posts, "all posts")
                }
            )
    }, [sortOrder, setPosts]);

    useEffect(() => {
        fetch("http://localhost:2500/api/allusers")
            .then(res => res.json())
            .then(data => {
                // console.log("this is all existing users:", data)
                setAllUsers(data)
            })

    }, []);

    function viewPost(postId){
        navigate(`/posts/id/${postId}`)
    }

    function viewProfile(username){
        navigate(`/posts/user/${username}`)
    }

    // Parameters:
    // kiaule - Kiaule has to be a post object.
    function viewPost2(postId){
        navigate(`/posts/${postId}`)
    }

    function orderAsc(){
        setSortOrder("asc")
    }

    function orderDesc(){
        setSortOrder("desc")
    }

    function deletePost(post_id){
        if(!loggedUser) {
            alert ("you must be logged in to delete posts!")
            return
        }

        fetch("http://localhost:2500/api/deletepost",
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json",
                    "authorization": localStorage.getItem("token")},
                body: JSON.stringify({ post_id })
            })
            .then(res => res.json())
            .then(data => {
                console.log("post to delete:", data)

                if (data.success) {
                    setPosts(prev => prev.filter(p => p._id !== post_id))
                }
            })
    }

    function editPost(post){
        navigate("/edit", { state: { getPost: post } })
    }

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
    }

    return (
        <div>
            <div className="flex j-center">
                <h2 className="pad">ALL USERS</h2>
            </div>

            {/*  ALL USERS GRID  */}

            <div className="grid-container margin-btm">
                {allUsers.map((user)=>
                    <div key={user._id} className="card flex j-space-between gap10">
                        <div>{user.username}</div>
                        <button onClick={()=>viewProfile(user.username)} className="btn">View profile</button>
                    </div>)}
            </div>

            {loggedUser && (
                <Link to={`/createpost`} className="btn btn-secondary">
                    Create new post, {loggedUser.username}!
                </Link>
            )}

            {/*  ALL POSTS GRID*/}

            <div className="flex j-center">
                <h2 className="pad">POSTS</h2>
            </div>

            <div className="grid-container">
                {getPosts.map((post, index)=>
                    <div className="card border pad"  key={index}>
                        <img src={post.image} alt="Post Image" className="post-image"/>
                        <div className="post-content answer">

                            <h3 className="post-title">{post.username}'s says: <span>{post.question}</span></h3>
                            <br/>
                            <h3 className="post-title">{post.username}'s mood: <span>{post.mood}</span></h3>
                            <br/>
                            <div>
                                <h2>AI answer:</h2>
                                <p className="post-description pad">{post.description.length > 200
                                    ? post.description.slice(0, 200) + "..."
                                    : post.description}</p>
                                <button onClick={()=>viewPost(post._id)} className="btn btn-secondary">VIEW POST</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllPostNode;