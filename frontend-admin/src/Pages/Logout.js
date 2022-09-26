import React, { useEffect } from 'react'
import Header from '../Components/Header'

export default function Logout() {

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        setTimeout(() => window.location.href = '/', 2000);
    }, [])

  return (
    <div className='w-full h-screen'>
        <Header/>
        <p className='p-6'>You are now being logged out...</p>
    </div>
  )
}

