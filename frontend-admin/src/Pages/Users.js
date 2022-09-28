import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/Header'

export default function Users() {
    const [users, setUsers] = useState(null)
    const [status, setStatus] = useState("")
    const [showUsers, setShowUsers] = useState(false)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

    const title = "Code.Blog - Users";

    useEffect(() => {
      document.title = title;
    }, [title]);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const response = await fetch(`${API_URL}/user`,
                {method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('token')
                }})
                if(response.ok) {
                    const jsonData = await response.json()
                    // console.log(jsonData)
                    setUsers(jsonData)
                    setShowUsers(true)
                } else {
                    console.log("Response error")
                    setStatus("Failed to fetch users")
                }
            } catch (err) {
                console.error(err.message)
                setStatus("Failed to fetch users")
            }
        }
        getUsers()
    },[API_URL])
    

    useEffect(()=> {
        if(localStorage.getItem('token')) {
            setIsLoggedIn(true);
        }
    },[])


    return (
        <div className='w-full'>
            <Header isLoggedIn={isLoggedIn}/>
            <div className='flex justify-center'>
                <div className='w-[50%] bg-white border rounded-lg my-10 p-6'>
                    <Link to="/home"><h2 className='text-2xl'>User List</h2></Link>
                    <p className='my-4'><Link to="/home" className=' text-blue-500'>{"<-- "}Back</Link></p>
                    <p>{status}</p>
                    {showUsers && users.users.map(user => (
                        <div className="border-b my-6" key={user._id}>
                            <p><span className='font-bold'>Username:</span> {user.username}</p>
                            <p><span className='font-bold'>User ID: </span>{user._id}</p>
                            <p><span className='font-bold'>Admin: </span>{JSON.stringify(user.admin)}</p>
                            <Link to={`/users/${user._id}`}><button className='mt-2 mb-5'>More</button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
