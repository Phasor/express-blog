import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function PostDetail() {
    const [post, setPost] = useState('')
    const { id } = useParams()
    const [statusMessage, setStatusMessage] = useState("")
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
        const response = await fetch(`http://localhost:3000/post/${id}`,
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
        if(response.ok) {
            setStatusMessage("Post updated successfully")
        } else {
            setStatusMessage("Post update failed")
        }
        
    }


    const deleteComment = async (commentID) => {
        try {
            const response = await fetch(`http://localhost:3000/comment/${commentID}`,
            {method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            const jsonData = await response.json()
            console.log(jsonData)
            if(jsonData.success === true) {
                setStatusMessage("Comment deleted successfully")
            } else {
                setStatusMessage("Comment delete failed")
            }

            // update the post like (remove the deleted comment)
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

        } catch(err) {
            console.error(err.message)
        }
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
        // reload the page
        const updatedPost = await fetch(`http://localhost:3000/post/${id}`,
        {method: 'GET'})
        const updatedPostJson = await updatedPost.json()
        setPost(updatedPostJson)
        setPostContent(updatedPostJson.post.content)
        setPostTitle(updatedPostJson.post.title)
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
        // reload the page
        const updatedPpst = await fetch(`http://localhost:3000/post/${id}`,
        {method: 'GET'})
        const updatedPostJson = await updatedPpst.json()
        setPost(updatedPostJson)
        setPostContent(updatedPostJson.post.content)
        setPostTitle(updatedPostJson.post.title)
    }
    
  
  return (
    <>
        {post && 
            <div>
                <Link to='/'><h1>Edit Post</h1></Link>
                <p>Post ID: {post.post._id}</p>
                <form onSubmit={updatePost}>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} name="title"/>
                    <br></br>
                    <label htmlFor="content">Post Content</label>
                    <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} name="content" rows="10" cols="100"/>
                    <p>Author: email: {post.post.author.username}, id:{post.post.author._id}</p>
                    <p>Posted: {post.post.date}</p>
                    <p>Published: {JSON.stringify(post.post.published)}</p>
                <button type="submit">Update Post</button>
                {statusMessage}
                </form>

                {!post.post.published && <button onClick={handlePublish}>Publish</button>}
                {post.post.published && <button onClick={handleUnpublish}>Unpublish</button>}
                {post.post.comments.map(comment => (
                    <div key={comment._id}>
                        <p>{comment.content}</p>
                        <p>{comment.date}</p>
                        <p>Comment Author: {comment.author}</p>
                        <p>Comment ID: {comment._id}</p>
                        <button onClick={() => deleteComment(comment._id)}>Delete Comment</button>
                        <p>------------------------</p>
                    </div>
                ))} 
            </div>
        }
    </>
  )
}
