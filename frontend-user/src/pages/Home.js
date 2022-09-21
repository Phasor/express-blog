import React, {useState, useEffect} from 'react'
import PostList from '../components/PostList';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

    const refreshHome = () => {
        setRefresh(!refresh);
    }

  useEffect(() => {    
    const getUsername = async () => {
        if(localStorage.getItem('token')){
            setUsername(localStorage.getItem('username'))
            setIsLoggedIn(true);
        }
    }
    getUsername()
    .catch(err => console.log(err));
    console.log("use Effect ran")
    }, [])


  return (
    <>
        <div>
            <Header isLoggedIn={isLoggedIn}/>   
            {isLoggedIn ? <h1>Welcome {username}</h1> : <h2>Sign in to leave comments...</h2>}
            <PostList 
                isLoggedIn={isLoggedIn} 
                username={username} 
                refreshHome={refreshHome}
            />
            <Footer/>
        </div>
    </>
  )
}
