import React, {useState, useEffect} from 'react'

export default function Post(props) {
    const [comment, setComment] = useState('');

    const postComment = async (e) => {
        try{
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
                    post: props.post._id
                })}
            );
            const commentJson = await response.json();
            console.log(commentJson);
        } catch(err) {
            console.log(err);
        }
    }


  return (
    <div>
        <h1>{props.post.title}</h1>
        <p>{props.post.content}</p>
        <p>Author: {props.post.author.username}</p>
        <p>Posted: {props.post.date}</p>
        <p>Comments:</p>
        {props.post.comments.map(comment => (
            <div key={comment._id}>
                <p >{comment.content}</p>
                <p >{comment.date}</p>
                <p>{comment.author}</p>
                <p>-------------------</p>
            </div>
        ))}
        {props.isLoggedIn && 
            <div>   
                <input type="text" placeholder="Leave comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button onClick={postComment}>Post Comment</button>
            </div>
        }    
        <p>---------------------------------------------------------------------------------------</p>
    </div>
  )
}
