import React, { useEffect, useState } from 'react'
import Post from './Post';

export default function PostList({isLoggedIn, username}) {
    const [posts, setPosts] = useState([]);
    const [isloading, setIsloading] = useState(true);
    
    useEffect(() => {
            const getPosts = async () => {
                const posts = await fetch(
                    'http://localhost:3000/post',
                    {method: 'GET'}
                );
                const postsJson = await posts.json();
                setIsloading(false);
                return postsJson;
            }
         getPosts()
        .then(updatedPosts => setPosts(updatedPosts))
        .catch(err => console.log(err));
    }, [])

    if (isloading) {
        return <div>Loading...</div>
    } else {
        return(
            <div className=''>
                {isLoggedIn ? <h1 className='m-2'>Welcome {username}</h1> : <h1 className='my-2 font-bold text-center italic'>Sign in to leave comments...</h1>}
                {
                    posts.map(post => (
                        <Post className="whitespace-pre-line"
                            key={post._id} 
                            post={post} 
                            isLoggedIn={isLoggedIn} 
                            setPosts={setPosts}
                        />
                    ))
                }
            </div>
          )
    }
}
