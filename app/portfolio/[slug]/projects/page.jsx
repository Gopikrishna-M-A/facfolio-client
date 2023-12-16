import React from 'react'
import Project from '../../../../components/portfolio/Project'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next';
import { options } from '../../../api/auth/[...nextauth]/options'
const baseURL = process.env.BASE_URL 
const page = async() => {
  const session = await getServerSession(options)
  const user = session?.user
  return (
    <Project baseURL={baseURL} user={user}/>
  )
}

export default page