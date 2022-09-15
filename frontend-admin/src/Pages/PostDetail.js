import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetail() {
    const [post, setPost] = useState('')
    const { id } = useParams()

    useEffect(() => {
        try{
            const getPost = async () => {
                console.log(id)
                const response = await fetch(`http://localhost:3000/post/${id}`,
                {method: 'GET'})
                const jsonData = await response.json()
                setPost(jsonData)
                console.log(jsonData)
            }
            getPost()
        } catch(err) {
            console.error(err.message)
        }
    }, [id])
    
    const updatePost = async (e) => {
    }

    const deleteComment = async (e) => {
    }
    
  
  return (
    <>
        {post && 
            <div>
                <h1>{post.post.title}</h1>
                <input type="text" value={post.post.title} />
                <textarea value={post.post.content} />
                <input type="text" value={post.author} />
                <input type="text" value={post.date} />
                <p>`Author: email: {post.post.author.username}, id:{post.post.author._id}`</p>
                <p>Posted: {post.post.date}</p>
                <p>Published: {JSON.stringify(post.post.published)}</p>
                {!post.post.published && <button>Publish</button>}
                <button onClick={updatePost}>Update Post</button>
                {post.post.comments.map(comment => (
                    <div key={comment._id}>
                        <p>{comment.content}</p>
                        <p>{comment.date}</p>
                        <p>{comment.author}</p>
                        <button onClick={deleteComment}>Delete Comment</button>
                        <p>------------------------</p>
                    </div>
                ))} 
            </div>
        }
    </>
  )
}

