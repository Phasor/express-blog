import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import PostList from '../Components/PostList'

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const title = "Code.Blog - Home";

    useEffect(() => {
      document.title = title;
    }, [title]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
        if (localStorage.getItem('admin') === true || 'true'){
            setIsAdmin(true)
        }

    }, [])

  return (
    <div className='w-full'>
        <Header isLoggedIn={isLoggedIn}/>
        <div className='flex justify-center'>
            <PostList isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
        </div>
    </div>
  )
}
