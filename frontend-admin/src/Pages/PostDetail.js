import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetail() {
    const [post, setPost] = useState('')
    const { id } = useParams()
    const [statusMessage, setStatusMessage] = useState(null)
    const [postContent, setPostContent] = useState("")
    const [postTitle, setPostTitle] = useState("")

    useEffect(() => {
        try{
            const getPost = async () => {
                const response = await fetch(`http://localhost:3000/post/${id}`,
                {method: 'GET'})
                const jsonData = await response.json()
                setPost(jsonData)
                setPostContent(jsonData.post.content)
                setPostTitle(jsonData.post.title)
                console.log(jsonData)
            }
            getPost()
        } catch(err) {
            console.error(err.message)
        }
    }, [id])
    
    const updatePost = async (e) => {
        const response = fetch(`http://localhost:3000/post/${id}`,
            {method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                title: e.target.title.value,
                content: e.target.content.value,
                author: post.post.author._id,
                date: post.post.date,
                published: post.post.published
                })
            })
        const responseJson = await response.json()
        console.log(`responsejson: ${responseJson}`)
        if(responseJson.success === true) {
            setStatusMessage("Post updated successfully")
        } else {
            setStatusMessage("Post update failed")
        }
        
    }


    const deleteComment = async (e) => {
    }

    const handlePublish = async (e) => {
        const response = await fetch(`http://localhost:3000/post/${id}/publish`,
        {method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        })
        const responseJson = await response.json()
        console.log(responseJson)
        if(responseJson.success === true) {
            setStatusMessage("Post updated successfully")
        } else {
            setStatusMessage("Post update failed")
        }
        console.log(statusMessage)
    }

    const handleUnpublish = async (e) => {
        const response = await fetch(`http://localhost:3000/post/${id}/unpublish`,
        {method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        })
        const responseJson = await response.json()
        console.log(responseJson)
        if(responseJson.success === true) {
            setStatusMessage("Post updated successfully")
        } else {
            setStatusMessage("Post update failed")
        }
        console.log(statusMessage)
    }
    
  
  return (
    <>
        {post && 
            <div>
                <h1>Edit Post</h1>
                <form onSubmit={updatePost}>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} name="title"/>
                    <br></br>
                    <label htmlFor="content">Post Content</label>
                    <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} name="content" rows="10" cols="100"/>
                    <p>`Author: email: {post.post.author.username}, id:{post.post.author._id}`</p>
                    <p>Posted: {post.post.date}</p>
                    <p>Published: {JSON.stringify(post.post.published)}</p>
                <button type="submit" onClick={updatePost}>Update Post</button>
                </form>

                {!post.post.published && <button onClick={handlePublish}>Publish</button>}
                {post.post.published && <button onClick={handleUnpublish}>Unpublish</button>}
                {statusMessage}
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

