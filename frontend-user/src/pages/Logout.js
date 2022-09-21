import React from 'react'
import Header from '../components/Header'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {localStorage.removeItem('token');}, 1000);
        setTimeout(() => {localStorage.removeItem('username');}, 1000);
        setTimeout(() => {localStorage.removeItem('userId');}, 1000);
        setTimeout(() => {navigate('/')}, 1500);
    }, [navigate])
    toast.success('Logout successful');

  return (
    <div>
        <Header/>
        <Toaster />
    </div>
  )
}
