import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";

const AllGamesGridScrapePage = () => {
    const [games, setGames] = useState([])
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const url = params.get("url");
    const name = params.get("name");


    useEffect(() => {
        fetch(`http://localhost:2500/games?url=${encodeURIComponent(url)}`)
            .then(res => res.json())
            .then(data =>{
                console.log("backend response:", data)
                setGames(data)
            } )

    }, [url]);



    return (
        <div className="grid-container">
            <h2>{name}</h2>
            {games.map((item, index) =>
                <div key={index} className="border pad">
                    <img src={item.img} alt={item.title} style={{ width: "100px" }}/>
                    <h3>{item.title}</h3>
                </div>

            )}
        </div>
    );
};

export default AllGamesGridScrapePage;