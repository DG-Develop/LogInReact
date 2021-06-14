import React from 'react'
import { useUser } from 'reactfire'

const Home = () => {
    const user = useUser().data

    //console.log(user)
    return (
        <div>
        <span>Home</span>
            
            <span>{user ?  user.email : "No Registrado" }</span>
        </div>
    )
}

export default Home
