import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Post({ isLoggedIn, setPosts, post }) {
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
                if(response.ok === false) {
                    setError(responseJson.message)
                }
                // fetch and set updated posts from the backend
                if(response.ok === true) {
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
        <p>Posted: {post.date}</p>
        <p>Author: {post.author.username}, {post.author._id}</p>
        <p>Published: {JSON.stringify(post.published)}</p>
        {isLoggedIn && <button onClick={deletePost}>Delete Post</button>}
        {isLoggedIn && <Link to={`/post/${post._id}`}><button>Edit Post</button></Link>}

        <p>Comments</p>
        {post.comments.map(comment => (
            <div key={comment._id}>
                <p>{comment.content}</p>
                <p>{comment.date}</p>
                <p>Comment Author: {comment.author}</p>
                <p>Comment ID: {comment._id} </p>
                <p>------------------------</p>
            </div>
        ))}
        {error && <p>{error}</p>} 
    </div>
  )
}
