import React from 'react';
import {Link, useNavigate} from "react-router-dom"


const Toolbar = ({loggedUser, setLoggedUser}) => {
    const navigate= useNavigate()

    function logout(){
        localStorage.clear()
        setLoggedUser (null)
        navigate("/posts")
    }

    return (
        <div className="border bg-color margin-btm">

            <nav className="navbar">
                <ul className="flex gap10 j-space-evenly">
                    <li><Link to="/posts" className="navbar">Home</Link></li>

                    {loggedUser && (
                        <Link to={`/chat`} className="navbar">
                            Live Chat! 💬
                        </Link>
                    )}

                    {!loggedUser && (
                        <Link to={`/register`} className="navbar">
                            Register
                        </Link>
                    )}
                    {!loggedUser && (
                        <Link to={`/Login`} className="navbar">
                            Login
                        </Link>
                    )}

                    {loggedUser && (
                        <Link to={`/profile/${loggedUser?.id}`} className="navbar">
                             {loggedUser.username}'s profile
                        </Link>
                    )}
                    {loggedUser && (
                        <Link
                            to="/posts"
                            className="navbar"
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                        >
                            Logout
                        </Link>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Toolbar;