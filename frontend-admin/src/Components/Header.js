import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
        <h1>Admin Panel</h1>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/users">Users</Link>
        <Link to="/posts">Posts</Link>
    </div>
  )
}
