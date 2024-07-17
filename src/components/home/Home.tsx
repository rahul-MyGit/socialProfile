// import React from 'react'
import { useAuth } from '../../contexts/authContext'

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div className='text-2xl font-bold pt-14'>Hello {currentUser ? currentUser.displayName ? currentUser.displayName : currentUser.email : "Unknown"}, you are now logged in.</div>
    )
}

export default Home