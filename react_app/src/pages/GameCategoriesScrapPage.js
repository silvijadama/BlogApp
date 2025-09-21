import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

const GameCategoriesScrapPage = () => {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:2500/categories")
            .then(res => res.json())
            .then(data => {
                console.log("fetched categories:", data)
                setCategories(data)
            } )
    }, []);

    function selectCategory(cat) {
        if (cat.url) {
            navigate(`/games?url=${encodeURIComponent(cat.url)}&name=${encodeURIComponent(cat.name)}`);
        } else {
            console.error("Category missing URL:", cat);
        }
    }

    return (
        <div className="flex flex-column gap10">
            {categories.map((cat, index)=>(
                <div onClick={() =>selectCategory(cat)} key={index} className="border pad">{cat.name}</div>
            ))}
        </div>
    );
};

export default GameCategoriesScrapPage;