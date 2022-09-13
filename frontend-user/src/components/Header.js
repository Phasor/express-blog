import React from 'react'
import {Link} from 'react-router-dom';

export default function Header() {

  return (
    <div>
        <h1>Ben's Blog</h1>
        <div>
            <Link to="/login">Log In</Link>
            <button>Sign Up</button>
        </div>
    </div>
  )
}
