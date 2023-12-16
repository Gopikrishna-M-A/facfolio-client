import React from 'react'
import AdminPage from '../components/AdminPage'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options'
const baseURL = process.env.BASE_URL 


const page = async() => {
  const session = await getServerSession(options)
  return (
    <AdminPage user={session.user} baseURL={baseURL} />
  )
}

export default page