import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from "react"
// import * as url from "node:url";
import Comments from "./components/Comments";
import Comment_Card from "./components/Comment_Card";


function App() {

    const [getData, setData] = useState([])
    const [getCommentCard, setCommentCard] = useState(null)


    function addComment(commentId){
        console.log("lalalal")
        fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`)
            .then(res => res.json())
            .then(data =>{
                setCommentCard(data)

            })

    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/comments/")
            .then(res => res.json())
            .then(data =>{
                setData(data)
            })
    }, []);



    return (
        <div className="App flex gap10">
            <div>
                {
                    getData.map((item, index) =>
                        <Comments
                            key={index}
                            comment={item}
                            add={addComment}
                        />)
                }
            </div>
            <div>
                {getCommentCard &&
                    <Comment_Card
                        comment={getCommentCard}/>
                }
            </div>
        </div>
    );
}

export default App;

