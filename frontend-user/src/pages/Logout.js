import React from 'react'
import Header from '../components/Header'
import { useEffect } from 'react'

export default function Logout() {

    useEffect(() => {
        setTimeout(() => {localStorage.removeItem('token');}, 1000);
        setTimeout(() => {localStorage.removeItem('username');}, 1000);
        setTimeout(() => {localStorage.removeItem('userId');}, 1000);
        setTimeout(() => {window.location.href = '/';}, 2000);
    }, [])

  return (
    <div>
        <Header/>
        <h2>Thank you for visiting. You are being logged out...</h2>
    </div>
  )
}
