//
// import './App.css';
// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import NodePage from "./pages/NodePage";
// import RegisterNodePage from "./../../pages/RegisterNodePage";
// import LoginNodePage from "./pages/LoginNodePage";
// import CreatePostNode from "./pages/CreatePostNode";
// import AllPostNode from "./pages/AllPostNode";
// import EditPostNode from "./pages/EditPostNode";
// import AllUsersNodePage from "./pages/AllUsersNodePage";
// import ProfileNodePage from "./pages/ProfileNodePage";
// import ToolbarMenu from "../../components/ToolbarMenu";
//
// // Create a separate component for the routes that needs navigation
// function AppRoutes() {
//     const [loggedUser, setLoggedUser] = useState(null);
//     const [getPosts, setPosts] = useState([]);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//
//         if (!token) {
//             console.log("No token found, redirecting to login");
//             navigate("/api/login");
//             return;
//         }
//
//         const loadUserData = async () => {
//             try {
//                 const response = await fetch("http://localhost:2500/api/user/me", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "authorization": token
//                     }
//                 });
//
//                 const data = await response.json();
//
//                 if (data.success) {
//                     setLoggedUser(data.user);
//                     console.log("User session restored:", data.user);
//                 } else {
//                     console.log("Invalid token, redirecting to login");
//                     localStorage.removeItem("token");
//                     navigate("/api/login");
//                 }
//             } catch (error) {
//                 console.error("Error loading user data:", error);
//                 navigate("/api/login");
//             }
//         };
//
//         loadUserData();
//     }, [navigate]);
//
//     return (
//         <Routes>
//             <Route path="/api/register" element={<RegisterNodePage/>} />
//             <Route path="/api/login" element={
//                 <LoginNodePage
//                     setLoggedUser={setLoggedUser}
//                     loggedUser={loggedUser}
//                 />
//             } />
//             <Route path="/api/createpost" element={
//                 <CreatePostNode
//                     loggedUser={loggedUser}
//                 />
//             } />
//             <Route path="/api/posts" element={
//                 <AllPostNode
//                     loggedUser={loggedUser}
//                     getPosts={getPosts}
//                     setPosts={setPosts}
//                 />
//             } />
//             <Route path="/api/edit" element={
//                 <EditPostNode
//                     loggedUser={loggedUser}
//                     getPosts={getPosts}
//                 />
//             } />
//
//             <Route path="/api/allusers" element={<AllUsersNodePage/>}/>
//             <Route path="/api/profile" element={<ProfileNodePage/>}/>
//         </Routes>
//     );
// }
//
// // Main App component
// function App() {
//     return (
//         <div className="App">
//             <BrowserRouter>
//                 <ToolbarMenu/>
//                 <AppRoutes />
//             </BrowserRouter>
//         </div>
//     );
// }
//
// export default App;
//
