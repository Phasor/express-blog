import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const LoginUser = async (e) => {
        e.preventDefault();
        try{
            // get the JWT
            const response = await fetch(
                'http://localhost:3000/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );
            const userJson = await response.json();
            
            if(userJson.success === true){ // login successful
                // set the JWT in local storage
                localStorage.setItem('token', userJson.token);
                localStorage.setItem('username', userJson.user.username);
                localStorage.setItem('userId', userJson.user._id);

                // redirect to home page
                setTimeout(() => {
                    navigate('/')
                }, 1000);
                toast.success('Login successful');
            } else {
                setErrors(userJson.errors);
                setMessage(userJson.message);
            }

        } catch(err) {
            console.log(err);
        }
    }


  return (
    <div className='h-screen'>
        <Header />
        <Toaster />
        <div className='flex justify-center font-robotoMono text-lg'>
            <div className="max-w-[1000px] mt-[200px] border border-gray-200 rounded-lg">  
                <h1 className='text-4xl font-bold mb-2 border-b border-gray-200 p-2'>Log In</h1>
                <form onSubmit={LoginUser} className="flex flex-col w-[300px]">
                    <label htmlFor="username" className='p-2'>Email</label>
                    <input type="text" className='p-2 mx-2 border border-gray-200 rounded-md' placeholder="adam@gmail.com" value={username} onChange={(e) => {setUsername(e.target.value)}} name="username" id="username"/>
                    <label htmlFor="password" className='p-2'>Password</label>
                    <input type="password"  className='p-2 mx-2 border border-gray-200 rounded-md mb-2' placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} name="password" id="password"/>
                    <button type="submit" value="Submit" className='p-2 mb-2 bg-blue-600 hover:bg-blue-700 text-white border rounded-lg mx-2'>Submit </button>
                </form>
                {errors && errors.map(error => <p>{error}</p>)}
                {message && <p>{message}</p>}
            </div>
        </div>
        <Footer />
    </div>
  )
}
