import React, { useEffect, useState } from 'react'
import {useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PostDetail() {
    const id = useParams().id;
    const [post, setPost] = useState({});
    const [showPost, setShowPost] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`${API_URL}/post/${id}`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json();
            setPost(data);
            setShowPost(true);
        }
        getPost();
    },[id, API_URL])

    useEffect(() => {    
        const getUsername = async () => {
            if(localStorage.getItem('token')){
                setIsLoggedIn(true);
            }
        }
        getUsername()
        .catch(err => console.log(err));
        }, [])

        const postComment = async (e) => {
            try{
                e.preventDefault();
                await fetch(
                    `${API_URL}/comment`,
                    {method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        content: comment,
                        author: localStorage.getItem('userId'),
                        post: id
                    })}
                );
                // const commentJson = await response.json();
                // refresh page
                const getPost = async () => {
                    const response = await fetch(`${API_URL}/post/${id}`,
                    {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    })
                    const data = await response.json();
                    setPost(data);
                    setShowPost(true);
                }
                getPost();
                setComment('');
            } catch(err) {
                setError(err);
                console.log(err);
            }
        }

    return (
        <div className='h-screen font-robotoMono text-lg'>
            <Header isLoggedIn={isLoggedIn}/>
            {showPost &&
                <div className='flex justify-center'>
                    <div className=" p-4 pr-8 max-w-[1000px] mt-[110px] mb-20">  
                        <Link to="/" className='text-blue-500 text-lg'>{"<--"} Back</Link>
                        <h1 className='text-4xl font-bold my-8'>{post.post.title}</h1>
                        <p className='my-2'><span className='font-bold'>Post Author:</span> {post.post.author.username}</p>
                        <p className='my-2 whitespace-pre-line'>{post.post.content}</p>
                        <p className='my-2'>{formatDate(post.post.date)}</p>
                        {isLoggedIn && 
                            <form onSubmit={postComment} className="my-6">   
                                <input type="text" placeholder="Leave comment..." className=" border border-gray-200 rounded-md md:w-[600px] p-1" value={comment} onChange={(e) => setComment(e.target.value)}/>
                                <button type="submit" className="bg-blue-600 hover:bg-blue-700 ml-4 rounded-md text-white py-1 px-2" onClick={postComment}>Post Comment</button>
                            </form>
                         } 
                         {error && <p className='text-red-500'>{error}</p>}
                        <p className='my-4 underline'><span className='font-bold'>Comments</span></p>
                        {post.post.comments.map(comment => (
                            <div key={comment._id}>
                                <p className='italic'>{comment.content}</p>
                                <p className='text-sm'>{formatDate(comment.date)}</p>
                                <p className='text-sm'>Comment Author: {comment.author.username}</p>
                                <p className=''>-------------------------------</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <Footer/>
        </div>
    )
}