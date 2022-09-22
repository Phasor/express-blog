import React from 'react'
import {Link} from 'react-router-dom';

export default function Header({isLoggedIn}) {

  return (
    <div className='w-full h-[90px] border-b border-gray-100 fixed top-0 z-50 drop-shadow-xl'>
    <Link to='/'><h1>Ben's Blog</h1></Link> 
        <div>
            {isLoggedIn ? <Link to="/logout">Log Out</Link> : <Link to="/login">Log In</Link>}
            {!isLoggedIn && <Link to='/signup'>Sign Up</Link>}
        </div>
    </div>
  )
}
