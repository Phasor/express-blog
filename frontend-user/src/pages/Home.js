import React, {useState, useEffect} from 'react'
import PostList from '../components/PostList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

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
                    <div className="grid grid-cols-12 gap-2 p-4 w-full mt-20">
                        <div className='col-start-1 col-end-10 max-h-[800px] overflow-auto'>
                            <PostList 
                                isLoggedIn={isLoggedIn} 
                                username={username} 
                                refreshHome={refreshHome}
                            />
                        </div>
                       <Sidebar/>
                    </div>
                </div>
            </div>   
        <Footer/> 
    </div>
  )
}
