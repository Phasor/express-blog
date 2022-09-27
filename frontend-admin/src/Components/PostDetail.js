import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from './Header'
import formatDate from '../utils/formatDate'

export default function PostDetail() {
    const [post, setPost] = useState('')
    const { id } = useParams()
    const [statusMessage, setStatusMessage] = useState("")
    const [postContent, setPostContent] = useState("")
    const [postTitle, setPostTitle] = useState("")
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

    useEffect(() => {
        try{
            const getPost = async () => {
                const response = await fetch(`${API_URL}/post/${id}`,
                {method: 'GET'})
                const jsonData = await response.json()
                setPost(jsonData)
                setPostContent(jsonData.post.content)
                setPostTitle(jsonData.post.title)
                // console.log(jsonData)
            }
            getPost()
        } catch(err) {
            console.error(err.message)
        }
    }, [id, API_URL])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
    }, [])
    
    const updatePost = async (e) => {
        const response = await fetch(`${API_URL}/post/${id}`,
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
        // const responseJson = await response.json()
        // console.log(`responsejson: ${responseJson}`)
        if(response.ok) {
            setStatusMessage("Post updated successfully")
        } else {
            setStatusMessage("Post update failed")
        }
        
    }


    const deleteComment = async (commentID) => {
        try {
            const response = await fetch(`${API_URL}/comment/${commentID}`,
            {method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            const jsonData = await response.json()
            // console.log(jsonData)
            if(jsonData.success === true) {
                setStatusMessage("Comment deleted successfully")
            } else {
                setStatusMessage("Comment delete failed")
            }

            // update the post like (remove the deleted comment)
            try{
                const getPost = async () => {
                    const response = await fetch(`${API_URL}/post/${id}`,
                    {method: 'GET'})
                    const jsonData = await response.json()
                    setPost(jsonData)
                    setPostContent(jsonData.post.content)
                    setPostTitle(jsonData.post.title)
                    // console.log(jsonData)
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
        const response = await fetch(`${API_URL}/post/${id}/publish`,
        {method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        })
        const responseJson = await response.json()
        // console.log(responseJson)
        if(responseJson.success === true) {
            setStatusMessage("Post updated successfully")
        } else {
            setStatusMessage("Post update failed")
        }
        // reload the page
        const updatedPost = await fetch(`${API_URL}/post/${id}`,
        {method: 'GET'})
        const updatedPostJson = await updatedPost.json()
        setPost(updatedPostJson)
        setPostContent(updatedPostJson.post.content)
        setPostTitle(updatedPostJson.post.title)
    }

    const handleUnpublish = async (e) => {
        const response = await fetch(`${API_URL}/post/${id}/unpublish`,
        {method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
        })
        const responseJson = await response.json()
        // console.log(responseJson)
        if(responseJson.success === true) {
            setStatusMessage("Post updated successfully")
        } else {
            setStatusMessage("Post update failed")
        }
        // reload the page
        const updatedPpst = await fetch(`${API_URL}/post/${id}`,
        {method: 'GET'})
        const updatedPostJson = await updatedPpst.json()
        setPost(updatedPostJson)
        setPostContent(updatedPostJson.post.content)
        setPostTitle(updatedPostJson.post.title)
    }
    
  
  return (
    <div className='w-full'>
        <Header isLoggedIn={isLoggedIn}/>
        {post && 
            <div className='flex justify-center'>
                <div className='w-[50%] bg-white border rounded-lg my-10 p-6 shadow-lg'>
                    <Link to="/" className='text-blue-500 underline'>{"<--"} Back</Link>
                    <Link to='/'><h2 className='text-2xl my-2'>Edit Post</h2></Link>
                    <p><span className='font-bold'>Post ID: </span>{post.post._id}</p>
                    <form onSubmit={updatePost} className="flex flex-col my-2">
                        <label htmlFor="title" className='font-bold my-2'>Title</label>
                        <input className='border border-gray-200 rounded-md w-[50%]' type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} name="title"/>
                        <label htmlFor="content" className='font-bold my-2'>Post Content</label>
                        <textarea className='mb-2 border border-gray-200 rounded-md' value={postContent} onChange={(e) => setPostContent(e.target.value)} name="content" rows="10" cols="100"/>
                        <p><span className='font-bold'>Author:</span> email: {post.post.author.username}, id:{post.post.author._id}</p>
                        <p><span className='font-bold'>Posted: </span> {formatDate(post.post.date)}</p>
                        <p><span className='font-bold'>Published: </span> {JSON.stringify(post.post.published)}</p>
                    <button className="my-2 bg-blue-700 text-white border rounded-md" type="submit">Update Post</button>
                    {statusMessage}
                    </form>

                    {!post.post.published && <button onClick={handlePublish} className="my-2">Publish</button>}
                    {post.post.published && <button onClick={handleUnpublish} className="my-2">Un-publish</button>}
                    <p className='my-2 font-bold text-lg'>Comments</p>
                    {post.post.comments.map(comment => (
                        <div className="text-sm" key={comment._id}>
                            <p className='text-lg italic'>{comment.content}</p>
                            <p>{formatDate(comment.date)}</p>
                            <p>Comment Author: {comment.author.username}</p>
                            <p>Comment ID: {comment._id}</p>
                            <button className='mt-2 mb-6' onClick={() => deleteComment(comment._id)}>Delete Comment</button>
                        </div>
                    ))} 
                </div>
            </div>
        }
    </div>
  )
}

