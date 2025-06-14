import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContexData } from '../context/UserContex'
const ProctedRouts = ({children}) => {

    const navigate = useNavigate()
    const {user} = useContext(UserContexData)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const token = localStorage.getItem('token')
      if(!token) {
        navigate('/register')
        return
      }

    //   have a token but not use r data
    if(!user || !user.email) {
        setIsLoading(true)
    } else {
        setIsLoading(false)
    }

}, [user, navigate])

if(isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
}

if(user && user.email) {
    return children
}

  return null
}

export default ProctedRouts