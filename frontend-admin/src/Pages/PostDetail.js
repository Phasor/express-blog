import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetail() {
    const [post, setPost] = useState(null)
    const [success, setSuccess] = useState(false)
    const postID = useParams().id

    useEffect(() => {
        try{
            const getPost = async () => {
                const response = await fetch(`http://localhost:3000/post/${postID}`,
                {method: 'GET'})
                const jsonData = await response.json()
                setPost(jsonData)
                console.log(jsonData)
                setSuccess(true)
                console.log(success)
            }
            getPost()
        } catch(err) {
            console.error(err.message)
        }
    }, [postID, success])
    
    
    
    // const deleteComment = async (id) => {
    // }

    // const updatePost = async (id) => {
    // }

  return (
    <div>
        {success && <p>{post.title}</p>}
   
            {/* <h1>{post.title}</h1>
            <input type="text" value={post.title} />
            <textarea value={post.content} />
            <input type="text" value={post.author} />
            <input type="text" value={post.date} />
            <p>`Author: email: {post.author.username}, id:{post.author._id}`</p>
            <p>Posted: {post.date}</p>
            <p>Published: {JSON.stringify(post.published)}</p>
            {!post.published && <button>Publish</button>}
            <button onClick={updatePost}>Update Post</button>
            {post.comments.map(comment => (
                <div key={comment._id}>
                    <p>{comment.content}</p>
                    <p>{comment.date}</p>
                    <p>{comment.author}</p>
                    <button onClick={deleteComment}>Delete Comment</button>
                    <p>------------------------</p>
                </div>
            ))} */}
      
        

    </div>
  )
}
