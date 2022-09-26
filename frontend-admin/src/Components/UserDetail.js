import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../Components/Header'

export default function UserDetail() {
    const [user, setUser] = useState('')
    const [comments, setComments] = useState('')
    const [showUser, setShowUser] = useState(false)
    const [error, setError] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const userID = useParams().id

    useEffect(() => {
        try{
            // get user details
            const getUser = async () => {
                const response = await fetch(`http://localhost:3000/user/${userID}`,
                {method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }})
                const jsonData = await response.json()
                console.log(jsonData)
                setUser(jsonData)
            }
            // get all users comments
            const getComments = async () => {
    
                const response = await fetch(`http://localhost:3000/comment/${userID}`,
                {method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }})
                const jsonData = await response.json()
                console.log(jsonData)
                setComments(jsonData)
                setShowUser(true)
            }
            getUser()
            getComments()
        } catch(err) {
            console.error(err.message)
            setShowUser(false)
            setError("Failed to fetch user.")
        }
    }, [userID])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
    }, [])

    const deleteComment = async (commentId) => {
        try{
            await fetch(`http://localhost:3000/comment/${commentId}`,
            {method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            console.log("Deleted comment")
            setComments(comments.filter(comment => comment._id !== commentId))
        } catch(err) {
            console.error(err.message)
        }
    }

    const deleteUser = async () => {
        try{
            await fetch(`http://localhost:3000/user/${userID}`,
            {method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            console.log("Deleted user")
            window.location = "/"
        } catch(err) {
            console.error(err.message)
        }
    }   

  return (
    <div className='w-full min-h-screen'>
        <Header isLoggedIn={isLoggedIn}/>
        <div className='flex justify-center'>
            <div className='w-[50%] bg-white border rounded-lg p-6 my-10'>
                {error}
                <Link to="/users" className='text-blue-500 italic my-2'>{"<--"} Back</Link>
                { showUser && 
                    <div className='mt-4'>
                        <p><span className='font-bold'>User: </span>{user.user.username}</p>
                        <p><span className='font-bold'>ID: </span> {user.user._id}</p>
                        <p><span className='font-bold'>Admin: </span>{JSON.stringify(user.user.admin)}</p>
                        <button onClick={deleteUser} className="my-2">Delete User</button>
                        <p className='my-2 font-bold'>Comments</p>
                        {comments.comments.map(comment => (
                            <div className='border-b my-4' key={comment._id}>
                                <p className='italic mb-2'>{comment.content}</p>
                                <p className='text-sm'>Post ID: {comment.post}</p>
                                <p className='text-sm'>Comment ID: {comment._id}</p>
                                <button onClick={() => deleteComment(comment._id)} className="mt-2 mb-4">Delete Comment</button>
                            </div>
                        ))}
                    </div> 
                }
            </div>
        </div>
    </div>
  )
}
