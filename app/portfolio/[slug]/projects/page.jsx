import React from 'react'
import Project from '../../../../components/portfolio/Project'
import { getServerSession } from 'next-auth/next';
import { options } from '../../../api/auth/[...nextauth]/options'
import axios from 'axios';

const baseURL = process.env.BASE_URL 

const fetchData = async (slug) => {
  const result = await axios(`${baseURL}/user/info/${slug}`);
  return result.data;
}

const page = async({ params }) => {
  const session = await getServerSession(options)
  const user = session?.user
  const data = await fetchData(params.slug)
  return (
    <Project baseURL={baseURL} user={user} data={data}/>
  )
}

export default page