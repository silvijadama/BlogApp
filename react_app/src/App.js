
import './App.css';
import React, {useEffect, useRef, useState} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NodePage from "./pages/NodePage";
import RegisterNodePage from "./pages/RegisterNodePage";
import LoginNodePage from "./pages/LoginNodePage";
import CreatePostNode from "./pages/CreatePostNode";
import AllPostNode from "./pages/AllPostNode";
import EditPostNode from "./pages/EditPostNode";
import ProfileNodePage from "./pages/ProfileNodePage";
import ToolbarMenu from "./components/ToolbarMenu";
import SingleAiPostPage from "./pages/SingleAiPostPage";
import SingleUserPage from "./pages/SingleUserPage";
import EditProfilePage from "./pages/EditProfilePage";
import LiveChatPage from "./pages/LiveChatPage";
import NotificationModal from "./components/NotificationModal"
import {socket} from "./socket";


// Main App component
function App() {
    const [loggedUser, setLoggedUser] = useState(null);
    const [getPosts, setPosts] = useState([]);
    const [lastPoke, setLastPoke] = useState(null)
    const [pokes, setPokes] = useState([])




    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("No token found, redirecting to login");
            return;
        }

        const loadUserData = async () => {
            console.log("loading initial user data")
            try {
                const response = await fetch("http://localhost:2500/api/user/me", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": token
                    }
                });

                const data = await response.json();

                if (data.success) {
                    setLoggedUser(data.user);
                    console.log("User session restored:", data.user);
                } else {
                    console.log("Invalid token, redirecting to login");
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };

        loadUserData();
    }, []);


    useEffect(() => {
        if (loggedUser && loggedUser.username) {
            console.log("Registering user with socket:", loggedUser.username);
            socket.emit("userConnected", loggedUser.username);
        }
    }, [loggedUser]);

    useEffect(() => {

        socket.on("userWhoPokedYou", (userWhoPokedSomeone) =>{
            console.log("This is users who poked another user array:", userWhoPokedSomeone)
            setPokes(prev => [...prev, { username: userWhoPokedSomeone.username, _id: Date.now() }])

            setLastPoke(userWhoPokedSomeone.username)
            setTimeout(() => setLastPoke(null), 6000)
        })
        return () => socket.off("userWhoPokedYou")
    }, [setLastPoke]);


    return (
        <div className="App">
            <BrowserRouter>

                <ToolbarMenu
                    setLoggedUser={setLoggedUser}
                    loggedUser={loggedUser}
                />
                <NotificationModal
                    lastPoke={lastPoke}
                    setLastPoke={setLastPoke}
                />
                <Routes>
                    <Route path="/register" element={<RegisterNodePage/>} />
                    <Route path="/login" element={
                        <LoginNodePage
                            setLoggedUser={setLoggedUser}
                            loggedUser={loggedUser}
                        />
                    } />
                    <Route path="/createpost" element={
                        <CreatePostNode
                            loggedUser={loggedUser}
                        />
                    } />
                    <Route path="/posts" element={
                        <AllPostNode
                            loggedUser={loggedUser}
                            getPosts={getPosts}
                            setPosts={setPosts}
                        />
                    } />

                    <Route path="/posts/id/:postId/" element={
                        <SingleAiPostPage
                            loggedUser={loggedUser}
                            getPosts={getPosts}
                            setPosts={setPosts}
                        />
                    } />
                    <Route path="/api/edit" element={
                        <EditPostNode
                            loggedUser={loggedUser}
                            getPosts={getPosts}
                        />
                    } />

                    <Route path="/chat" element={
                        <LiveChatPage
                            loggedUser={loggedUser}/>}/>
                    <Route path="/posts/user/:username" element={<SingleUserPage
                            loggedUser={loggedUser}
                    />}/>
                    <Route path="/profile/:id" element={<ProfileNodePage/>}/>
                    <Route path="/profile/:id/edit" element={<EditProfilePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

