import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import truncatePost from '../utils/truncatePost';

export default function Post({setPosts, post, isLoggedIn}) {
    const [comment, setComment] = useState("");
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

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
                    post: post._id
                })}
            );

            // const commentJson = await response.json();
            // console.log(commentJson);
            setComment('');

            const refreshedPosts = await fetch(
                `${API_URL}/post`,
                {method: 'GET'}
                )
            const refreshedPostsJson = await refreshedPosts.json();
            // console.log(refreshedPostsJson);
            setPosts(refreshedPostsJson);

        } catch(err) {
            console.log(err);
        }
    }


  return (
    <div className='border-b px-2'>
        <h1 className='text-4xl font-bold my-8'>{post.title}</h1>
        <p className='mb-3 whitespace-pre-line'>{truncatePost(post.content,200)}</p>
        <Link to={`/${post._id}`} className="underline text-blue-600">Full Post</Link>
        <p className='mt-4'><span className='font-bold'>Post Author:</span> {post.author.username}</p>
        <p className='mb-4'>{formatDate(post.date)}</p>
        {isLoggedIn && 
            <form onSubmit={postComment} className="mb-10">   
                <input type="text" placeholder="Leave comment..." className=" border border-gray-200 rounded-md md:w-[600px] p-1" value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 ml-4 rounded-md text-white py-1 px-2" onClick={postComment}>Post Comment</button>
            </form>
        }    
        {post.comments.length > 0 && <p className='font-bold underline'>Comments</p>}
        {post.comments.map(comment => (
            <div key={comment._id} className="mb-8">
                <p className='italic'>{comment.content}</p>
                <p className='text-sm'>{formatDate(comment.date)}</p>
                <p className='text-sm'>Comment Author: {comment.author.username}</p>
            </div>
        ))}
    </div>
  )
}
