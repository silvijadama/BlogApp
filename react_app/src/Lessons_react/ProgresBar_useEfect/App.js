import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from "react"
// import * as url from "node:url";
import Input from "./components/Input";
import Input_Cards from "./components/Input_Cards";
import ProgressBar from "./components/ProgressBar";




function App() {

    const [getPost, setPost] = useState([])
    const [getProgress, setProgress] = useState(0)

    function addPost(postData){
        if (getPost.length > 10) return

        const newPost ={
            value: postData,
            time: new Date().toLocaleTimeString()
        }

        setPost([...getPost, newPost])

    }


    useEffect(() => {
        if (getProgress < 100)
            setProgress(getPost.length *10)
    }, [getPost]);


    return (
        <div className="App flex j-center gap10">
            <Input
                create={addPost}/>
            <div className="border card">
                {getPost.map((post, index) =>
                    <Input_Cards
                        key={index}
                        post={post}
                    />
                )}
            </div>
            <ProgressBar progress={getProgress}/>
        </div>
    );
}

export default App;

