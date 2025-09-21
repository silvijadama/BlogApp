import React from 'react';

const AllUserPostPage = (props) => {
    return (
        <div>
            <div className="grid-container">

                {props.posts.map((post, index)=>
                    <div className="post-card" key={index}>
                        <img src={post.image} alt="Post Image" className="post-image"/>
                        <div className="post-content">
                            <h2 className="post-title">{post.title}</h2>
                            <p className="post-user">Posted by: <span>{post.username}</span></p>
                            <p className="post-description">{post.description}</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AllUserPostPage;