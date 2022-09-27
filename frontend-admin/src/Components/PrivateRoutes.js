import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

export default function PrivateRoutes({ children }) {
    const isAuth = useAuth()
    if(isAuth){
        return children ? children : <Outlet />;
    } else {
        return <Navigate to="/login"/>
    }
}




