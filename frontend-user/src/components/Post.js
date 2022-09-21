import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

export default function Post({setPosts, post, isLoggedIn, username, refreshHome}) {
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
    <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>Author: {post.author.username}</p>
        <p>Posted: {formatDate(post.date)}</p>
        <Link to={`/${post._id}`}>Full Post</Link>
        {post.comments.length > 0 && <p>Comments</p>}
        {post.comments.map(comment => (
            <div key={comment._id}>
                <p >{comment.content}</p>
                <p >{formatDate(comment.date)}</p>
                <p>{comment.author}</p>
                <p>-------------------</p>
            </div>
        ))}
        {isLoggedIn && 
            <form onSubmit={postComment}>   
                <input type="text" placeholder="Leave comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button type="submit" onClick={postComment}>Post Comment</button>
            </form>
        }    
        <p>---------------------------------------------------------------------------------------</p>
    </div>
  )
}
