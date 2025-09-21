import React from 'react';
import {Link} from "react-router-dom"
import {useStore} from "../store/store";

const Toolbar = ({}) => {

    const cart = useStore((state) => state.cart)

    function countItems(){
        return cart.length
    }

    return (
        <div className="border bg-color">
            <nav>
                <ul className="flex gap10 j-space-between">
                    <li><Link to="/products" className="nav-link">Home</Link></li>
                    <li><Link to="/shoppingcart" className="nav-link">🛒 {countItems()}</Link></li>
                    {/*<li><Link to="/login">Login</Link></li>*/}
                    {/*<li><Link to="/createpost">Edit</Link></li>*/}
                    {/*<li><a href="/CreatePostPage">Create Post</a></li>*/}
                    {/*<li><a href="/AllPostPage">Posts</a></li>*/}
                </ul>
            </nav>
        </div>
    );
};

export default Toolbar;