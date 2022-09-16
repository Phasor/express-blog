import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'

export default function PrivateRoutes() {
    const isLoggedIn = useAuth()

  return (
    isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
  )
}
