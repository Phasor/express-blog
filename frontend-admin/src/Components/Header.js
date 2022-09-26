import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({isLoggedIn}) {
  return (
    <div className='bg-[#1e1e2c] text-white h-[100px]'>
        <h1 className='text-4xl p-2'>Blog Admin Panel</h1>
        <div className='flex justify-between max-w-[200px] p-2'>
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {isLoggedIn && <Link to="/logout">Logout</Link>}
            {isLoggedIn && <Link to="/users">Users</Link>}
            {isLoggedIn && <Link to="/create-post">Create Post</Link>}
        </div>
    </div>
  )
}
