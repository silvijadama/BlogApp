import React from 'react';

const SinglePostPage = ({singlePost}) => {
    return (
        <div>
                <div className="post-card">
                    <img src={singlePost.image} alt="Post Image" className="post-image"/>
                    <div className="post-content">
                        <h2 className="post-title">{singlePost.title}</h2>
                        <p  className="post-user">Posted by: <span>{singlePost.username}</span></p>
                        <p className="post-description">{singlePost.description}</p>
                        {/*<button onClick={deletePost}>Delete</button>*/}
                    </div>
                </div>
        </div>
    );
};

export default SinglePostPage;