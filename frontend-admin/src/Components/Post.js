import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../utils/formatDate'

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
    <div className='my-4 border-b border-gray-200'>
        <h2 className='text-2xl my-2'>{post.title}</h2>
        <p className='my-4'>{post.content}</p>
        <p><span className='font-bold'>Posted:</span> {formatDate(post.date)}</p>
        <p><span className='font-bold'>Author:</span> {post.author.username}, ID: {post.author._id}</p>
        <p><span className='font-bold'>Published:</span> {JSON.stringify(post.published)}</p>
        {isLoggedIn && <button onClick={deletePost} className="my-2 mr-2">Delete Post</button>}
        {isLoggedIn && <Link to={`/post/${post._id}`}><button className='className="my-2'>Edit Post</button></Link>}
        <p className='font-bold text-lg my-2'>Comments</p>
        {post.comments.map(comment => (
            <div className='my-4' key={comment._id}>
                <p className='italic'>{comment.content}</p>
                <p className='text-sm'>{ formatDate(comment.date)}</p>
                <p className='text-sm'>Comment Author: {comment.author.username}</p>
                <p className='text-sm'>Comment ID: {comment._id} </p>
            </div>
        ))}
        {error && <p>{error}</p>} 
    </div>
  )
}
