import React, {useState, useEffect} from 'react'
import PostList from '../components/PostList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const title = "Code.Blog - Home";

  useEffect(() => {
    document.title = title;
  }, [title]);

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
    }, [])


  return (
    <div className='w-full font-robotoMono text-lg'>       
        <Header isLoggedIn={isLoggedIn}/>
            <div className='flex justify-center'> 
                <div className='max-w-[1500px]' >
                    <div className="p-4 w-full mt-20 flex flex-col md:grid md:grid-cols-12 md:gap-2 ">
                        <div className='md:col-start-1 md:col-end-10 md:max-h-[800px] md:overflow-auto'>
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
