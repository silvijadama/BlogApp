
import './App.css';
import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterNodePage from "./pages/RegisterNodePage";
import LoginNodePage from "./pages/LoginNodePage";
import CreatePostNode from "./pages/CreatePostNode";
import HomePage from "./pages/HomePage";
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
                    <Route path="/posts" element={
                        <HomePage
                            loggedUser={loggedUser}
                            getPosts={getPosts}
                            setPosts={setPosts}
                        />
                    } />
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

                    <Route path="/posts/id/:postId/" element={
                        <SingleAiPostPage
                            loggedUser={loggedUser}
                            getPosts={getPosts}
                            setPosts={setPosts}
                        />
                    } />
                    <Route path="/profile/edit" element={
                        <EditProfilePage
                            loggedUser={loggedUser}
                            setLoggedUser={setLoggedUser}
                        />
                    } />

                    <Route path="/chat" element={
                        <LiveChatPage
                            loggedUser={loggedUser}/>}/>
                    <Route path="/posts/user/:username" element={<SingleUserPage
                            loggedUser={loggedUser}
                    />}/>
                    <Route path="/profile" element={<ProfileNodePage
                        loggedUser={loggedUser}
                    />}/>
                    {/*<Route path="/profile/edit" element={<EditProfilePage/>}/>*/}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

