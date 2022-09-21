import React from 'react'
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
        <>
            <p>Made with love by <a href="https://twitter.com/Phas0r" target="_blank" rel="noreferrer">@Phas0r</a> 🙌</p>
            <a href="https://github.com/Phasor" target="_blank" rel="noreferrer">GitHub</a>
            <Link to="/login">Log In</Link>
        </>  
  )
}
