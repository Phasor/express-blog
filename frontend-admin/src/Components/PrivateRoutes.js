import React, { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Components/Header'

export default function PrivateRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

    const token = window.localStorage.getItem("token") || ''
    
    useEffect(() => {
        const isAuth = async () => {
            await fetch(`${API_URL}/post/all`, {
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            }).then((res) => {
                // console.log(res)
                if (res.status === 200) setIsLoggedIn(true)
                setIsChecking(false);
                return;
            })
        }
        isAuth()
    }, [token, API_URL])

    if(isChecking) return (
        <div>
            <Header/>
            <p className='w-full h-screen p-8 text-center'>Trying to log you in...</p>
        </div>
    )

    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}




