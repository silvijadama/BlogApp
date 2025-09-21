import React, {useRef} from 'react';

const CreatePost = (props) => {
    const titleInput = useRef()
    const imgInput = useRef()

    function create(){
      const  postData ={
            title: titleInput.current.value,
            image: imgInput.current.value,
            owner: props.user.username,
            likes:[]
        }

        props.createPost(postData)
    }
    return (

            <div className="card flex flex-column pad align-center gap10">
                <input type="text" placeholder="Post title" ref={titleInput}/>
                <input type="text" placeholder="image url" ref={imgInput}/>
                <button onClick={create} className="btn">Create Post</button>
            </div>

    );
};

export default CreatePost;