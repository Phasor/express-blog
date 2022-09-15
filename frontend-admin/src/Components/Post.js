import React, { useState } from 'react'

export default function Post({post, isLoggedIn, setPosts}) {
    const[error, setError] = useState(null)

    const deletePost = async (id) => {
        try {       
                // send a DELETE request to the backend
                const response = await fetch(`http://localhost:3000/post/${post._id}`, 
                {method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
                })
                const responseJson = await response.json()
                console.log(responseJson)
                if(responseJson.success === false) {
                    setError(responseJson.message)
                }
                // fetch and set updated posts from the backend
                if(responseJson.success === true) {
                    const updatedPosts = await fetch('http://localhost:3000/post',
                    {method: 'GET'})
                    const jsonData = await updatedPosts.json()
                    setPosts(jsonData)
                }
            } catch(err) {
                console.error(err.message)
            }
        }

  return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>`Author: email: {post.author.username}, id:{post.author._id}`</p>
        <p>Posted: {post.date}</p>
        <p>Published: {JSON.stringify(post.published)}</p>
        {isLoggedIn && (
            <button onClick={deletePost}>Delete Post</button>
            )
        }
        <p>Comments</p>
        {post.comments.map(comment => (
            <div key={comment._id}>
                <p>{comment.content}</p>
                <p>{comment.date}</p>
                <p>{comment.author}</p>
                <p>------------------------</p>
            </div>
        ))}
        {error && <p>{error}</p>}
    </div>
  )
}
