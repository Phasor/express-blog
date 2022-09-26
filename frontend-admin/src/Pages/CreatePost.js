import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

export default function CreatePost() {
    const[success, setSuccess] = useState(false);
    const[error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsLoggedIn(true)
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const content = e.target.content.value;
        const author = localStorage.getItem('userId');

        try{
            // Send post request to backend
            
            const response = await fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ 
                    title, 
                    content,
                    author
                 }),
            });

            const jsonReponse = await response.json();
            console.log(jsonReponse);
            if(jsonReponse.successful){
                setSuccess(true);
                setTimeout(() => { window.location = '/'; }, 2000);
            } else {
                setError(jsonReponse.message);
            }
        } catch (error) {
            console.log(error);
        }
};

  return (
    <div className='w-full min-h-screen'>
        <Header isLoggedIn={isLoggedIn}/>
        <div className='flex justify-center'>   
            <div className='w-[50%] bg-white border rounded-lg my-10 p-6 shadow-lg'>
                <Link to='/' className=' text-blue-500 hover:text-blue-700'>{"<--"}Back</Link>
                <h2 className='text-2xl mb-3' >Create Post</h2>
                <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-2 flex flex-col">
                    <label htmlFor="title" className="m-1"><span className='font-bold'>Title</span></label>
                    <input className='border border-gray-200 rounded-lg w-[50%] my-2 p-1' type="text" placeholder="Title" name="title" />
                    <label htmlFor="content" className="m-1"><span className='font-bold'>Post Content</span></label>
                    <textarea className='whitespace-pre-line border border-gray-200 rounded-lg p-1' rows="10" placeholder="Post content..." name="content" />
                    <p className='my-2 text-red-600 italic'>Posts must be staged and then published after to appear on the blog.</p>
                    <button className='my-4 bg-blue-700 border rounded-md text-white' type="submit">Stage Post</button>
                </form>
                {success && <p>Post created successfully!</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    </div>
  )
}
