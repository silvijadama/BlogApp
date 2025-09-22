import React, {useRef} from 'react';
import { useNavigate} from "react-router-dom";
import {useStore} from "../store/store";

const CreatePostPage = ({loggedUser}) => {
    console.log("Loading create post node")

    const imageInput = useRef()
    const contentInput = useRef()
    const navigate = useNavigate()
    const setMood = useStore((state) => state.setMood)
    const selectedMood = useStore((state) => state.selectedMood)


    function createPost() {

        const token = localStorage.getItem("token")
        const image = imageInput.current.value
        const questionForAi = contentInput.current.value

        if (!questionForAi) return

        fetch("http://localhost:2500/api/createpost", {
            method: "POST",
            headers: {"Content-type": "application/json", "authorization": token},
            body: JSON.stringify({mood: selectedMood, image, question: questionForAi})
        })
            .then(res => res.json())
            .then(data => {
                console.log("Created post", data)
                if (data.success) {
                    console.log("AI says, when creating a post:", data.post)
                } else {
                    alert(data.message || "Error creating post");
                }
                navigate("/posts")
            })
    }

        function selectMood(mood) {
            setMood(selectedMood === mood ? "" :mood )
        }

        console.log("current logged in user in create post:", loggedUser)
        if (loggedUser === null) {
            return <p>Loading user...</p>
        }

        return (

            <div className="container">
                <h2>Create post page</h2>

                <form>
                    <h3>Select AI mood for post</h3>
                    <div className="flex gap10 j-center pad">
                        <button onClick={()=>selectMood("romantic")} type="button"
                                className={`btn ${selectedMood === "romantic" ? "btn-primary" : "btn-secondary"}`}>Romantic</button>
                        <button onClick={()=>selectMood("serious")} type="button"
                                className={`btn ${selectedMood === "serious" ? "btn-primary" : "btn-secondary"}`}>Serious</button>
                    </div>
                    <div className="flex j-center pad gap10">
                        <button onClick={()=>selectMood("fun")} type="button"
                                className={`btn ${selectedMood === "fun" ? "btn-primary" : "btn-secondary"}`}>Fun</button>
                        <button onClick={()=>selectMood("happy")} type="button"
                                className={`btn ${selectedMood === "happy" ? "btn-primary" : "btn-secondary"}`}>Happy</button>
                    </div>
                    <div className="flex j-center pad gap10">
                        <button onClick={()=>selectMood("sad")} type="button"
                                className={`btn ${selectedMood === "sad" ? "btn-primary" : "btn-secondary"}`}>Sad</button>
                        <button onClick={()=>selectMood("excited")} type="button"
                                className={`btn ${selectedMood === "excited" ? "btn-primary" : "btn-secondary"}`}>Excited</button>
                    </div>
                    <div className="flex flex-column gap10 pad j-center">
                        <input type="text" placeholder="Photo url" ref={imageInput}/>
                        <input type="text" ref={contentInput} placeholder="Ask AI's something"></input>
                    </div>
                    <div className="flex j-center">
                        <button onClick={createPost} type="button" className="btn">Create Post</button>
                    </div>
                </form>
            </div>
        );
    };

export default CreatePostPage;