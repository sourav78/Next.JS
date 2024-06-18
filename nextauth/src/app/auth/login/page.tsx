"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface UserType{
  email: string,
  password: string
}

const Login = () => {

  const router = useRouter()

  const [user, setUser] = useState<UserType>({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onLogin = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log(response.data);
      router.push("/auth/profile")
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      console.log(error);
      toast.error(error.response.data.error)
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-semibold mb-6'>Login</h1>
      <label className='mb-1 mt-2' htmlFor="">Email</label>
      <input
        className='outline-none px-2 py-1 bg-transparent border-2 border-white'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})} 
        placeholder='email'
        type="text" />
      <label className='mb-1 mt-2' htmlFor="">Password</label>
      <input
        className='outline-none px-2 py-1 bg-transparent border-2 border-white'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})} 
        placeholder='Password'
        type="text" />
      
      <button
        disabled={buttonDisabled}
        className={`py-1 px-4 ${isLoading ? "border-none" : "border-2"} border-white mt-4 cursor-pointer`}
        onClick={onLogin}
      >
        {isLoading ? "Proccessing..." : "Login"}
      </button>

      <Link className='mt-4 text-sm text-blue-400' href={"/auth/signup"}>Go to signup</Link>
    </div> 
  )
}

export default Login