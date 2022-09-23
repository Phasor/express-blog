import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import truncatePost from '../utils/truncatePost';

export default function Post({setPosts, post, isLoggedIn}) {
    const [comment, setComment] = useState("");

    const postComment = async (e) => {
        try{
            e.preventDefault();
            const response = await fetch(
                'http://localhost:3000/comment',
                {method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content: comment,
                    author: localStorage.getItem('userId'),
                    post: post._id
                })}
            );

            const commentJson = await response.json();
            console.log(commentJson);
            setComment('');

            const refreshedPosts = await fetch(
                'http://localhost:3000/post',
                {method: 'GET'}
                )
            const refreshedPostsJson = await refreshedPosts.json();
            console.log(refreshedPostsJson);
            setPosts(refreshedPostsJson);

        } catch(err) {
            console.log(err);
        }
    }


  return (
    <div className='border-b px-2'>
        <h1 className='text-4xl font-bold my-8'>{post.title}</h1>
        <p className='mb-3'>{truncatePost(post.content,200)}</p>
        <Link to={`/${post._id}`} className="underline text-blue-600">Full Post</Link>
        <p className='mt-4'><span className='font-bold'>Post Author:</span> {post.author.username}</p>
        <p className='mb-4'>{formatDate(post.date)}</p>
        {post.comments.length > 0 && <p className='font-bold underline'>Comments</p>}
        {post.comments.map(comment => (
            <div key={comment._id} className="mb-8">
                <p className='italic'>{comment.content}</p>
                <p >{formatDate(comment.date)}</p>
                <p>Comment Author: {comment.author.username}</p>
            </div>
        ))}
        {isLoggedIn && 
            <form onSubmit={postComment}>   
                <input type="text" placeholder="Leave comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button type="submit" onClick={postComment}>Post Comment</button>
            </form>
        }    
        
    </div>
  )
}
