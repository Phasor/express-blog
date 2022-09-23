import React from 'react'

export default function Sidebar() {
  return (
      <div className='col-start-10 col-end-13 h-full  '>
            <div className='flex justify-center '>
                <div className='w-4/5'>
                    {/*About Me*/}
                    <img src="/ape.jpg" alt="Mutant Ape" className='max-w-[100%] h-auto mt-20' />   
                    <p className='text-center font-bold'>About Me</p>
                    <p className='text-right text-sm'>I am a software engineer working on a MSc in Computer Science @ Georgia Tech. Ex Oxford Univ. and Barclays. 
                    I specialise in crypto fullstack development. Contributor @ <a href="https://twitter.com/Airswap" target="_blank" rel="noreferrer" className='text-blue-500'>AirSwap</a>. DM for work.
                    </p>

                    {/*Socials*/}
                    <p className='underline text-center mt-4'>Socials</p>
                    <div className='flex justify-center'>
                        <a href="https://twitter.com/Phas0r" target="_blank" rel="noreferrer" className='text-blue-500 mr-4'>@Phas0r</a>
                        <a href="https://github.com/Phasor" target="_blank" rel="noreferrer" className='text-blue-500'>GitHub</a>
                    </div>

                    {/*Email signup*/}
                    <div className='w-full border border-gray-200 shadow-md rounded-md mt-4 flex flex-col justify-center'>
                        <p className='text-center underline'>Newsletter Signup</p>
                        <input type="email" placeholder='ben@gmail.com' className='w-full border border-gray-200 rounded-md'/>
                    </div>
                </div>  
            </div>
        </div>
  )
}
