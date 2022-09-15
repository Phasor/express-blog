import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({isLoggedIn}) {
  return (
    <>
        <h1>Blog Admin Panel</h1>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/users">Users</Link>
        <Link to="/posts">Posts</Link>
        {isLoggedIn && <Link to="/create-post">Create Post</Link>}
        {isLoggedIn && <p>Welcome {localStorage.getItem('username')}</p>}
        <p>------------------------------------------------------------------------------</p>
    </>
  )
}
