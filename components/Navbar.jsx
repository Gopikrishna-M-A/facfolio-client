import React from 'react'
import Nav from './Nav'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next';
import { options } from '../app/api/auth/[...nextauth]/options'

const Navbar = async() => {

  const session = await getServerSession(options)
  const user = session?.user

  return (
    <Nav user={user}/>
  )
}

export default Navbar