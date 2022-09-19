import React, { useEffect, useState } from 'react'

export default function Users() {
    const [users, setUsers] = useState(null)
    const [status, setStatus] = useState("")
    const [showUsers, setShowUsers] = useState(false)

    const getUsers = async () => {
        try{
            const response = await fetch('http://localhost:3000/user',
            {method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('token')
            }})
            if(response.ok) {
                const jsonData = await response.json()
                console.log(jsonData)
                setUsers(jsonData)
                setStatus("Users fetched successfully")
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

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h1>User List</h1>
            <p>{status}</p>
            {showUsers && users.users.map(user => (
                <div key={user._id}>
                    <p>Username: {user.username}</p>
                    <p>User ID: {user._id}</p>
                    <p>Admin: {JSON.stringify(user.admin)}</p>
                    <p>------------------------</p>
                </div>
            ))}
        </div>
    )
}
