import React from 'react'
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
        <div className='border-t p-2 flex justify-between'>
            <p>Made with love by <a href="https://twitter.com/Phas0r" target="_blank" rel="noreferrer">@Phas0r</a> 🙌</p>
            <div>
                <a href="https://github.com/Phasor" target="_blank" rel="noreferrer" className='mr-4'>GitHub</a>
                <Link to="/login">Log In</Link>
            </div>
        </div>  
  )
}
