import React from 'react'
import {Link} from 'react-router-dom';

export default function Header({isLoggedIn}) {

  return (
    <div>
    <Link to='/'><h1>Ben's Blog</h1></Link> 
        <div>
            {isLoggedIn ? <Link to="/logout">Log Out</Link> : <Link to="/login">Log In</Link>}
            {!isLoggedIn && <Link to='/signup'>Sign Up</Link>}
        </div>
        <p>-----------------------------------------------------------------------------------------</p>
    </div>
  )
}
