import React from 'react'

export default function Sidebar() {
  return (
      <div className='col-start-10 col-end-13 bg-blue-100 h-full '>
            <div className='flex justify-center p-4'>
                <div className='w-4/5 border border-black mt-10'>
                    <img src="/ape.jpg" alt="Mutant Ape" className='max-w-[100%] h-auto' />   
                    <p className='text-center font-bold'>About Me</p>
                    <p className='text-right text-sm'>I am a software engineer working on a MSc in Computer Science @ Georgia Tech. 
                        I specialise in crypto fullstack development. Contributor @ <a href="https://twitter.com/Airswap" target="_blank" rel="noreferrer">AirSwap</a>.
                    </p>
                    <p className='underline text-center'>Socials</p>
                    <div className='flex justify-center'>
                        <a href="https://twitter.com/Phas0r" target="_blank" rel="noreferrer" className='text-blue-500 mr-4'>@Phas0r</a>
                        <a href="https://github.com/Phasor" target="_blank" rel="noreferrer" className='text-blue-500'>GitHub</a>
                    </div>
                </div>  
            </div>
        </div>
  )
}
