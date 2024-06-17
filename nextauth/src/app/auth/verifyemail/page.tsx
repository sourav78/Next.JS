"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const VerifyEmail = () => {
    // const router = useRouter()

    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})
            setIsVerified(true)
        } catch (error: any) {
            console.log(error);
            setError(true)
        }
    }

    useEffect(() => {
        setError(false)

        const token = window.location.search.split("=")[1]
        const decodedToken = decodeURIComponent(token)
        setToken(decodedToken)

        // const {query} = router
        // const urlToken = query.token
        // setToken(urlToken as string || "")
    }, [])

    useEffect(() => {
        setError(false)
        if(token.length > 0){
            verifyEmail()
        }
    }, [token])

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-semibold mb-6'>Signup</h1>
        <h2 className='text-blue-400'>Token: {token}</h2>
        {
            isVerified && (
                <div className="">
                    <h2>User verified</h2>
                    <Link className='text-blue-400' href={"/auth/login"}>Login now</Link>
                </div>
            )
        }
        {
            error && (
                <div className="">
                    <h2>Something went wrong</h2>
                    <h2>User not verified</h2>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail