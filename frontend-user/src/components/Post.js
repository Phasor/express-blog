import React from 'react'

export default function Post(props) {
  return (
    <div>
        <h1>{props.post.title}</h1>
        <p>{props.post.content}</p>
        <p>Author: {props.post.author.username}</p>
        <p>Posted: {props.post.date}</p>
        <p>Comments:</p>
        {props.post.comments.map(comment => (
            <>
                <p>{comment.content}</p>
                <p>{comment.date}</p>
                <p>{comment.author}</p>
                <p>-------------------</p>
            </>
        ))}
    </div>
  )
}
