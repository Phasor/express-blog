import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header'
import toast, { Toaster } from 'react-hot-toast';

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
    <div>
        <Header />
        <Toaster />
        <h1>Log In</h1>
        <form onSubmit={LoginUser}>
            <label htmlFor="username">Email</label>
            <input type="text" placeholder="adam@gmail.com" value={username} onChange={(e) => {setUsername(e.target.value)}} name="username" id="username"/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} name="password" id="password"/>
            <input type="submit" value="Submit"/>
        </form>
        {errors && errors.map(error => <p>{error}</p>)}
        {message && <p>{message}</p>}
    </div>
  )
}
