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
    <div className='w-full font-robotoMono text-lg'>       
        <Header isLoggedIn={isLoggedIn}/>
            <div className='flex justify-center'> 
                <div className='max-w-[1500px]' >
                    <div className="grid grid-cols-10 gap-16 p-8 w-full">
                        <div className='col-start-1 col-end-8'>
                            <PostList 
                                isLoggedIn={isLoggedIn} 
                                username={username} 
                                refreshHome={refreshHome}
                            />
                        </div>
                        <div className='col-start-8 col-end-11 bg-blue-300 h-full '>
                            <p>CTA</p>    
                        </div>
                    </div>
                </div>
        </div>   
        <Footer/> 
    </div>
  )
}
