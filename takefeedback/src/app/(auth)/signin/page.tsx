"use client"

import {useSession, signIn, signOut} from 'next-auth/react'

export default function Component(){
  const {data : session} = useSession()
  if (session) {
    return(
      <>
        <p>Signin as {session.user.username}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return(
    <>
      <p>Not signin</p>
      <button onClick={() => signIn()}>Sign out</button>
    </>
  )
}