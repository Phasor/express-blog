import React, { useEffect, useState } from 'react'
import Post from './Post';

export default function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
            const getPosts = async () => {
                const posts = await fetch(
                    'http://localhost:3000/post',
                    {method: 'GET'}
                );
            const postsJson = await posts.json();
            setPosts(postsJson);
        }
        getPosts()
        .catch(err => console.log(err));
    }, [])

return(
    <div>
        {
            posts.map(post => (
                <Post key={post._id} post={post}/>
            ))
        }
    </div>
  )
}
