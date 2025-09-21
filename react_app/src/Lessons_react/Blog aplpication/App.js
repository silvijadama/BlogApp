import logo from './logo.svg';
// import * as url from "node:url";
import './App.css';
import React, {useState} from "react"
import Register from "./components/Register";
import Login from "./components/Login";
import CreatePost from "./components/Create_Post";
import PostCard from "./components/Post_Card";

function App() {

    const [newUser, setNewUser] = useState([])
    const [getLogUser, setLogUser] = useState(null)
    const [getPost, setPost] =  useState([])
    const [getCount, setCount] = useState(0)


    function registerUser(userData){
        setNewUser([...newUser, userData])
        console.log("new user",newUser)
    }

    function loginUser(logData){
        setLogUser(logData.username)
        console.log("logged user", logData.username)
    }

    function createNewPost(postData){
        setPost([...getPost, postData])
        console.log("new post", getPost, postData)
    }

    function logout(){
        setLogUser(null)
        console.log("login out", getLogUser)
    }

    function likePost(){
        setCount(getCount + 1)
        console.log("add likes", getCount)
    }

    return (
        <div className="App gap10">
            <div className="flex j-center gap10">

                <Register add={registerUser} users={newUser} />

                {newUser.length > 0 && (
                    <Login users={newUser} log={loginUser}/>
                )}
            </div>

            {/*toolbar*/}
            {getLogUser && (
                <>
                    <div className="flex j-space-between pad border">
                        <h3>Current User: {getLogUser}</h3>
                        <button  onClick={logout} className="btn">Logout</button>
                    </div>

                    <div className="flex j-center pad">
                        <CreatePost
                            createPost={createNewPost}
                            user={{username: getLogUser}}
                        />
                    </div>

                    <div className="grid-container">

                        {getPost.map((post, index)=>
                            <PostCard
                                key={index}
                                post={post}
                                likePost={likePost}
                                currentUser={getLogUser}
                                countLikes={getCount}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;

