import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import {useParams } from 'react-router-dom';
import formatDate from '../utils/formatDate';

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
        <>
            <Header/>
            {showPost &&
                <>
                    <h1>Post Detail</h1>
                    <p>{post.post.title}</p>
                    <p>Author: {post.post.author.username}</p>
                    <p>Posted: {formatDate(post.post.date)}</p>
                    <p>{post.post.content}</p>
                    <p>Comments</p>
                    {post.post.comments.map(comment => (
                        <div key={comment._id}>
                            <p>{comment.content}</p>
                            <p>{formatDate(comment.date)}</p>
                            <p>Comment Author: {comment.author.username}</p>
                            <p>------------------------</p>
                        </div>
                    ))}
                </>
            }
        </>
    )
}