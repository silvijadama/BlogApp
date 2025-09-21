import React, {useState} from 'react';
import {Link} from "react-router-dom"
import {useStore} from "../store/store";

const ToolbarShopMenu = () => {

    const reserved = useStore((state) => state.reserved)
    const availableMoney = useStore(state => state.availableMoney)

    // function countItems(){
    //     console.log(reserved.length, "reserved items count")
    //     return reserved.length
    // }

    return (
        <div className="border bg-color margin-btm">
            <nav>
                <ul className="flex gap10 j-start">
                    <li><Link to="/api/practice" className="nav-link">Practice functions</Link></li>
                    <li><Link to="/api/register" className="nav-link">Register</Link></li>
                    <li><Link to="/api/login" className="nav-link">Login</Link></li>
                    <li><Link to="/api/upload" className="nav-link">Upload Product</Link></li>
                    <li><Link to="/api/allproducts" className="nav-link">All Products</Link></li>
                    <li><Link to="/api/myproducts" className="nav-link">My Products:{reserved.length}</Link></li>
                    <li className="nav-link">$ Available: {availableMoney}</li>
                </ul>
            </nav>
        </div>
    );
};

export default ToolbarShopMenu;