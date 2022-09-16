import React from 'react'
import Header from '../Components/Header'

export default function Login() {
    const handleSubmit = async (e) => {
        try{
            e.preventDefault()
            const username = e.target.elements.username.value
            const password = e.target.elements.password.value
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            const jsonData = await response.json()
            if(jsonData.success === true){
                localStorage.setItem('token', jsonData.token)
                localStorage.setItem('username', jsonData.user.username)
                localStorage.setItem('userId', jsonData.user._id)
                localStorage.setItem('admin', jsonData.user.admin)
                console.log(jsonData)
                window.location = '/'
            }
        } catch (err) {
            console.error(err.message)
        }
    }


  return (
    <>
        <Header/>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
    </>
  )
}
