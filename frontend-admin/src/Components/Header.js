import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({isLoggedIn}) {
  return (
    <div className='bg-[#1e1e2c] h-[100px]'>
        <div className='flex justify-between items-center p-2'>
        <h1 className='text-4xl p-4'>Admin Panel</h1>
        <div className='mr-5'>
            {!isLoggedIn && <Link to="/login" className='px-3 py-2  border border-gray-500 rounded-lg hover:bg-gray-800'>Login</Link>}
            {isLoggedIn && <Link to="/logout">Logout</Link>}
            {isLoggedIn && <Link to="/users">Users</Link>}
            {isLoggedIn && <Link to="/create-post">Create Post</Link>}
        </div>
        </div>
    </div>
  )
}
