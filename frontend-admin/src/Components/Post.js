import React from 'react'

export default function Post({post}) {
  return (
    <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>`Author: email: {post.author.username}, id:{post.author._id}`</p>
        <p>Posted: {post.date}</p>
        <p>Published: {post.published}</p>
        <p>Comments</p>
        {post.comments.map(comment => (
            <>
                <p>{comment.content}</p>
                <p>{comment.date}</p>
                <p>{comment.author}</p>
                <p>------------------------</p>
            </>
        ))}
    </div>
  )
}
