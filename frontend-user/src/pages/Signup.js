import React, { useState } from 'react'
import Header from '../components/Header'

export default function Signup() {
    const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
    try{
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        
        const response = await fetch('http://localhost:3000/user',
        {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
        })
        const userJson = await response.json();
        console.log(userJson);
        if(userJson.success === true){
            setSuccess(true);
            localStorage.setItem('token', userJson.token);
            localStorage.setItem('username', userJson.user.username);
            localStorage.setItem('userId', userJson.user._id);
            setTimeout(() => {window.location.href = '/';}, 2000);
        }

    } catch (error) {
        console.log(error);
    }
}


  return (
    <div>
        <Header/> 
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="text" name="username" placeholder="adam@gmail.com"/>
            <label>Password</label>
            <input type="password" name="password" placeholder="Password"/>
            <button type="submit">Sign Up</button>
        </form>
        {success && <h2>Thank you for signing up. You are being redirected to the home page...</h2>}
    </div>
  )
}
