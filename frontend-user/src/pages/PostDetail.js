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

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(`http://localhost:3000/post/${id}`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const data = await response.json();
            setPost(data);
            setShowPost(true);
        }
        getPost();
    },[id])

    return (
        <div className='h-screen'>
            <Header/>
            {showPost &&
                <div className='flex justify-center font-robotoMono text-lg'>
                    <div className="max-w-[1000px] mt-[110px]">  
                        <Link to="/" className='text-blue-500 text-lg'>{"<--"} Back</Link>
                        <h1 className='text-4xl font-bold my-8'>{post.post.title}</h1>
                        <p className='my-2'><span className='font-bold'>Post Author:</span> {post.post.author.username}</p>
                        <p className='my-2'>{post.post.content}</p>
                        <p className='my-2'>{formatDate(post.post.date)}</p>
                        <p className='my-4 underline'><span className='font-bold'>Comments</span></p>
                        {post.post.comments.map(comment => (
                            <div key={comment._id}>
                                <p className='italic'>{comment.content}</p>
                                <p className='text-sm'>{formatDate(comment.date)}</p>
                                <p className='text-sm'>Comment Author: {comment.author.username}</p>
                                <p>------------------------</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <Footer/>
        </div>
    )
}