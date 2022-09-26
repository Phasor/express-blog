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
    <div className='bg-[#1e1e2c] h-screen w-full text-[#fffff2]'>
        <Header/>
        <div className='flex justify-center '>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/4 border border-gray-700 rounded-lg p-4 mt-[200px] bg-gray-800 opacity-75">
                <label className='p-1' htmlFor="username">Email</label>
                <input className='p-1 m-1 border-gray-600 rounded text-black' type="text" name="username" id="username" placeholder='admin@gmail.com' />
                <label className='p-1' htmlFor="password">Password</label>
                <input className='p-1 m-1 border-gray-600 rounded text-black' type="password" name="password" id="password" placeholder='Password'/>
                <button type="submit" className='m-1 mt-4 bg-blue-700'>Login</button>
            </form>
        </div>
    </div>
  )
}
