import React, {useState, useEffect} from 'react'
import PostList from '../components/PostList';
import Header from '../components/Header';
import {Link} from 'react-router-dom';


export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getUsername = async () => {
        if(localStorage.getItem('token')){
            setUsername(localStorage.getItem('username'))
            setIsLoggedIn(true);
        }
    }
    getUsername()
    .catch(err => console.log(err));
    }, [])


  return (
    <>
        <div>
            <Header/>   
            {isLoggedIn ? <h1>Welcome {username}</h1> : <h1>Welcome</h1>}
            <PostList isLoggedIn={isLoggedIn} username={username}/>
            <Link to="/login">Log In</Link>
        </div>
    </>
  )
}
