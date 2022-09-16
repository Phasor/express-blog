import React, {useState, useEffect} from 'react'
import Post from './Post'

export default function PostList({ isLoggedIn }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try{
            const getPosts = async () => {
                const response = await fetch('http://localhost:3000/post/all',
                {method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }})
                const jsonData = await response.json()
                setPosts(jsonData)
            }
            getPosts()
        } catch(err) {
            console.error(err.message)
        }
    }, [])


  return (
    <div>
        {posts.map(post => (
            <Post key={post._id} post={post} isLoggedIn={isLoggedIn} setPosts={setPosts}/>
        ))}
    </div>
  )
}
