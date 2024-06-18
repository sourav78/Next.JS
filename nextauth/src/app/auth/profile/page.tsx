"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Profile = () => {

  const router = useRouter();

  const [data, setData] = useState<any>({})

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/profile")
      console.log(response.data.data);
      setData(response.data.data)
    } catch (error:any) {
      console.log(error);
      toast.error(error.message)
      router.push("/auth/login")
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      router.push("/auth/login")
    } catch (error:any) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h1>Profile</h1>
      <h2>ID: {data._id}</h2>
      <h2>Username: {data.username}</h2>
      <h2>Email: {data.email}</h2>
      <button className='bg-red-500 px-2 py-1 rounded mt-4'
        onClick={logout}
      >Logout</button>
    </div>
  )
}

export default Profile