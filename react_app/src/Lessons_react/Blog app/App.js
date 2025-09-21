import logo from './logo.svg';
// import * as url from "node:url";
import './App.css';
import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Toolbar from "./components/Toolbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AllPostPage from "./pages/AllPostPage";
import AllUserPostPage from "./pages/AllUserPostPage"
import SinglePostPage from "./pages/SinglePostPage"
import CreatePostPage  from "./pages/CreatePostPage"
import EditPostPage from "./pages/EditPostPage"



function App() {

    const [newUser, setNewUser] = useState([])
    const [getLoggedUser, setLoggedUser] = useState(null)
    const [getPost, setPost] = useState([])
    const [getSecretKey, setSecretKey] =  useState("")
    const [getUsersPosts, setUsersPosts] = useState([])
    const [getSinglePost, setSinglePost] = useState(null)
    const [getAllPosts, setAllPosts] = useState([])





    function registerUser(newUserData){
        setNewUser([...newUser, newUserData])
        console.log("new user", newUserData)

    }

    function loginUser(userData){
        setLoggedUser(userData)
        console.log("logged user", userData)
    }

    function createPost(postData){
        setPost([...getPost, postData])
        console.log(postData, "this is a new post")
    }

    function getAllUserPosts(){
        setUsersPosts([...getUsersPosts, ])
    }

    function deletePost(){
        setPost([])
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Toolbar/>
                <h3>Current user {getLoggedUser ? getLoggedUser.name : "none"}</h3>
                <Routes>
                    <Route path="/RegisterPage" element={<RegisterPage
                        addUser={registerUser}
                        user={newUser}
                        secretKey={setSecretKey}/>} />

                    <Route path="/LoginPage" element={<LoginPage
                        log={loginUser}
                        secretKey={setSecretKey}/>} />

                    <Route path="/AllPostPage" element={<AllPostPage
                        renderPosts={setAllPosts}
                        posts={getAllPosts}
                        secretKey={getSecretKey}
                        setUsersPosts={setUsersPosts}
                        singlePost={setSinglePost}/>} />

                    <Route path="/AllUserPostPage" element={<AllUserPostPage
                        posts={getUsersPosts}/>} />

                    <Route path="/SinglePostPage" element={<SinglePostPage
                        singlePost={getSinglePost}/>} />
                    <Route path="/CreatePostPage" element={<CreatePostPage
                        create={createPost}
                        user={getLoggedUser}
                        secretKey={getSecretKey}/>} />
                    <Route path="/EditPostPage" element={<EditPostPage/>} />

                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;

