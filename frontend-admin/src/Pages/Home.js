import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import PostList from '../Components/PostList'

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
        if (localStorage.getItem('admin') === true || 'true'){
            setIsAdmin(true)
        }

    }, [])

  return (
    <div>
        <Header isLoggedIn={isLoggedIn}/>
        <PostList isLoggedIn={isLoggedIn} isAdmin={isAdmin}/>
    </div>
  )
}
