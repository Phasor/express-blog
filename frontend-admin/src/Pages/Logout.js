import React, { useEffect } from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        setTimeout(navigate('/'), 2000);
    }, [navigate])

  return (
    <div className='w-full h-screen'>
        <Header/>
        <p className='p-6'>You are now being logged out...</p>
    </div>
  )
}

