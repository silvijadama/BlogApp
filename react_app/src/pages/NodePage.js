import React from 'react';

const NodePage = () => {

    function sendPost(){
        const user ={
            username: "silvija",
            city: "Vilnius",
        }

        const options = {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(user)
        }

        fetch("http://localhost:2500/adduser", options)
            .then(data => data.json())
            .then(res => {
                console.log(res)
            })
    }


    return (
        <div>
            <h4 onClick={sendPost}>Get post</h4>
        </div>
    );
};

export default NodePage;