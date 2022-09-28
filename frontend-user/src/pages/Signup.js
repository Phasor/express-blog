import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    const title = "Code.Blog - Sign Up";

    useEffect(() => {
      document.title = title;
    }, [title]);

const handleSubmit = async (e) => {
    try{
        e.preventDefault();        
        const response = await fetch(`${API_URL}/user`,
        {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
        })
        const userJson = await response.json();
        console.log(userJson);
        if(userJson.success === true){
            localStorage.setItem('token', userJson.token);
            localStorage.setItem('username', userJson.user.username);
            localStorage.setItem('userId', userJson.user._id);
              // redirect to home page
              setTimeout(() => {
                navigate('/')
            }, 2000);
            toast.success('Signup successful');
        } else {
            if(userJson.errors) setErrors(userJson.errors);
            if(userJson.message) setMessage(userJson.message);
        }

    } catch (error) {
        console.log(error);
    }
}


  return (
    <div className='h-screen'>
        <Header />
        <Toaster />
        <div className='flex justify-center font-robotoMono text-lg'>
            <div className="max-w-[1000px] mt-[200px] border border-gray-200 rounded-lg">  
                <h1 className='text-4xl font-bold mb-2 border-b border-gray-200 p-2'>Sign Up</h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
                    <label htmlFor="username" className='p-2'>Email</label>
                    <input type="text" className='p-2 mx-2 border border-gray-200 rounded-md' placeholder="adam@gmail.com" value={username} onChange={(e) => {setUsername(e.target.value)}} name="username" id="username"/>
                    <label htmlFor="password" className='p-2'>Password</label>
                    <input type="password"  className='p-2 mx-2 border border-gray-200 rounded-md mb-2' placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} name="password" id="password"/>
                    <button type="submit" value="Submit" className='p-2 mb-2 bg-blue-600 hover:bg-blue-700 text-white border rounded-lg mx-2'>Submit </button>
                </form>
            </div>
        </div>
        {errors &&  (
            <div className='flex justify-center'>
                    <ul className='text-red-500 italic text-lg font-bold mt-5'>
                        {errors.map((error, index) => {
                            return <li key={index}>{error.msg}</li>
                        })}
                    </ul>
            </div>
        )}
        {message && <p className='text-red-500 italic mt-5 text-center text-lg font-bold'>{message}</p>}
        <Footer />
    </div>

    // <div>
    //     <Header/> 
    //     <h1>Sign Up</h1>
    //     <form onSubmit={handleSubmit}>
    //         <label>Email</label>
    //         <input type="text" name="username" placeholder="adam@gmail.com"/>
    //         <label>Password</label>
    //         <input type="password" name="password" placeholder="Password"/>
    //         <button type="submit">Sign Up</button>
    //     </form>
    //     {success && <h2>Thank you for signing up. You are being redirected to the home page...</h2>}
    // </div>
  )
}
