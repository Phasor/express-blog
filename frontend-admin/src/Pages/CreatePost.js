import React, { useState } from 'react';
import Header from '../Components/Header';

export default function CreatePost() {
    const[success, setSuccess] = useState(false);
    const[error, setError] = useState(null);


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
    <div>
        <Header />
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Title" name="title" />
            <label htmlFor="content">Post Content</label>
            <textarea placeholder="Body" name="content" />
            <button type="submit">Submit</button>
        </form>
        {success && <p>Post created successfully!</p>}
        {error && <p>{error}</p>}
    </div>
  )
}
