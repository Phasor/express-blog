import React, { useEffect, useState } from 'react'
import Post from './Post';

export default function PostList(props) {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
            const getPosts = async () => {
                const posts = await fetch(
                    'http://localhost:3000/post',
                    {method: 'GET'}
                );
                const postsJson = await posts.json();
                return postsJson;
            }
        getPosts()
        .then(updatedPosts => setPosts(updatedPosts))
        .catch(err => console.log(err));
    }, [])

return(
    <div>
        {
            posts.map(post => (
                <Post 
                    key={post._id} 
                    post={post} 
                    isLoggedIn={props.isLoggedIn} 
                    username={props.username}
                    refreshHome={props.refreshHome}
                    setPosts={setPosts}
                />
            ))
        }
    </div>
  )
}
