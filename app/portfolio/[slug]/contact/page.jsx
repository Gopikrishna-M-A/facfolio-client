import React from 'react'
import Contact from '../../../../components/portfolio/Contact'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next';
import { options } from '../../../api/auth/[...nextauth]/options'
const baseURL = process.env.BASE_URL 
const page = async() => {
  const session = await getServerSession(options)
  const user = session?.user
  return (
    <Contact baseURL={baseURL} user={user}/>
  )
}

export default page