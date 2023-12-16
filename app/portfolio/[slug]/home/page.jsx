import React from 'react'
import Home from '../../../../components/portfolio/Home'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next';
import { options } from '../../../api/auth/[...nextauth]/options'
const baseURL = process.env.BASE_URL 
const page = async() => {
  const session = await getServerSession(options)
  const user = session?.user
  return (
    <Home baseURL={baseURL} user={user}/>
  )
}

export default page