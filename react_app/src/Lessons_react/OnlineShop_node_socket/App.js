
import './App.css';
import React, {useEffect, useRef, useState} from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { socket} from "./socket"
import NodePage from "./pages/NodePage";
import RegisterNodePage from "./pages/RegisterNodePage";
import LoginNodePage from "./pages/LoginNodePage";
import ToolbarShopMenu from "./components/ToolbarShopMenu";
import UploadItemPage from "./pages/NodePages/UploadItemPage";
import AllProductsPage from "./pages/NodePages/AllProductsPage";
import MyProductsPage from "./pages/NodePages/MyProductsPage";
import InputPracticePage from "./pages/InputPracticePage";

function AppRoutes({setBgColor}) {

    const [user, setUser] = useState(null)
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    // const bgRef = useRef()
    // const [getBgColor, setBgColor] = useState("")


    // shop///
    const [loggedUser, setLoggedUser] = useState(null);
    const [getItems, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onBgColor(color) {
            setBgColor(color);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('bgColor', onBgColor);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('bgColor', onBgColor);
        };
    }, [setBgColor]);





    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //
    //     if (!token) {
    //         console.log("No token found, redirecting to login");
    //         navigate("/api/login");
    //         return;
    //     }
    //
    //     const loadUserData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:2500/api/user/me", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "authorization": token
    //                 }
    //             });
    //
    //             const data = await response.json();
    //
    //             if (data.success) {
    //                 setLoggedUser(data.user);
    //                 console.log("User session restored:", data.user);
    //             } else {
    //                 console.log("Invalid token, redirecting to login");
    //                 localStorage.removeItem("token");
    //                 navigate("/api/login");
    //             }
    //         } catch (error) {
    //             console.error("Error loading user data:", error);
    //             navigate("/api/login");
    //         }
    //     };
    //
    //     loadUserData();
    // }, [navigate]);

    return (
        <Routes>
            <Route path="/api/register" element={<RegisterNodePage/>} />
            <Route path="/api/login" element={
                <LoginNodePage
                    setLoggedUser={setLoggedUser}
                    loggedUser={loggedUser}
                />
            } />
            <Route path="/api/upload" element={
                <UploadItemPage
                    loggedUser={loggedUser}
                />
            } />
            <Route path="/api/allproducts" element={
                <AllProductsPage
                    loggedUser={loggedUser}
                    getItems={getItems}
                    setItems={setItems}
                />
            } />
            <Route path="/api/myproducts" element={
                <MyProductsPage/>
            } />
            <Route path="/api/practice" element={
                <InputPracticePage/>
            } />

        </Routes>
    );
}

// Main App component
function App() {
    const [getBgColor, setBgColor] = useState("")
    const bgRef = useRef()
    const ref = useRef()

    function sendMessage(){
        const username = ref.current.value
        socket.emit("registerUser", username)
    }

    function updateBgColor(){
        const pickedBgColor = bgRef.current.value
        socket.emit("userBG", pickedBgColor)
    }

    return (
        <div className="App" style={{backgroundColor: getBgColor}}>
            <input type="color" ref={bgRef}/>
            <button onClick={updateBgColor}>Set Color</button>

            <input type="text" ref={ref}/>
            <button onClick={sendMessage}>Register</button>

            <BrowserRouter>
                <ToolbarShopMenu/>
                <AppRoutes setBgColor={setBgColor}/>
            </BrowserRouter>
        </div>
    );
}

export default App;

