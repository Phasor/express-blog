import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import PostList from '../Components/PostList'

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
    }, [])

  return (
    <div>
        <Header isLoggedIn={isLoggedIn}/>
        <PostList isLoggedIn={isLoggedIn}/>
    </div>
  )
}
