import React from 'react';
import {useParams} from "react-router-dom";

const HomePage = () => {

    return (
        <div>
            <div className="container">
                <div className="header-box">
                    TRAVEL THE WORLD
                </div>
                <div className="article-box"
                     style={{backgroundColor: "skyblue"}}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ad autem culpa dolorum enim harum illo nam qui temporibus!
                    Ad corporis culpa enim in
                    iste obcaecati optio repellendus reprehenderit sed suscipit?
                </div>
            </div>

        </div>
    );
};

export default HomePage;