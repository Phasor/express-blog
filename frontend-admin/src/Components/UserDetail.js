import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function UserDetail() {
    const [user, setUser] = useState('')
    const [comments, setComments] = useState('')
    const [showUser, setShowUser] = useState(false)
    const [error, setError] = useState('')

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

    const deleteComment = async (commentId) => {
        try{
            await fetch(`http://localhost:3000/comment/${commentId}`,
            {method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            console.log("Deleted comment")
            //setComments(comments.filter(comment => comment._id !== commentId))

            // // fetch updated list of comments
            // const getUpdatedComments = async () => {
            //     const response = await fetch(`http://localhost:3000/comment/${userID}`,
            //     {method: 'GET',
            //     headers: {
            //         'Authorization': localStorage.getItem('token')
            //     }})
            //     const jsonData = await response.json()
            //     console.log(jsonData)
            //     setComments(jsonData)
            // }
            // getUpdatedComments()
        } catch(err) {
            console.error(err.message)
        }
    }

  return (
    <>
        {error}
        <Link to="/users">Back</Link>
        { showUser && 
            <>
                <p>{user.user.username}</p>
                <p>ID: {user.user._id}</p>
                <p>Admin: {JSON.stringify(user.user.admin)}</p>
                <p>Comments:</p>
                {comments.comments.map(comment => (
                    <div key={comment._id}>
                        <p>{comment.content}</p>
                        <p>Post ID: {comment.post}</p>
                        <p>Comment ID: {comment._id}</p>
                        <button onClick={() => deleteComment(comment._id)}>Delete</button>
                        <p>------------------------</p>
                    </div>
                ))}
            </> 
        }
    </>
  )
}
