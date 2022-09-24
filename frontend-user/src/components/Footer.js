import React from 'react'

export default function Footer() {
  return (
    <div className='fixed bottom-0 w-full bg-slate-50'>
        <div className=' w-full border-t p-2 flex flex-row justify-between '>
            <p>Made with love by <a href="https://twitter.com/Phas0r" target="_blank" rel="noreferrer">@Phas0r</a> 🙌</p>
            <a href="https://github.com/Phasor" target="_blank" rel="noreferrer" className='mr-4'>GitHub</a>
        </div>  
    </div>
  )
}
