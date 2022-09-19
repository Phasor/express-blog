import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({isLoggedIn}) {
  return (
    <>
        <h1>Blog Admin Panel</h1>
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/logout">Logout</Link>}
        <Link to="/users">Users</Link>
        {isLoggedIn && <Link to="/create-post">Create Post</Link>}
        {isLoggedIn && <p>Welcome {localStorage.getItem('username')}</p>}
        <p>------------------------------------------------------------------------------</p>
    </>
  )
}
