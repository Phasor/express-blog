import React, {useState, useEffect} from 'react'
import Post from './Post'

export default function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        try{
            const getPosts = async () => {
                const response = await fetch('http://localhost:3000/post',
                {method: 'GET'})
                const jsonData = await response.json()
                setPosts(jsonData)
            }
        getPosts()
        } catch (err) {
            console.error(err.message)
        }
    }, [])
 

  return (
    <div>
        {posts.map(post => (
            <Post key={post._id} post={post}/>
        ))}
    </div>
  )
}
