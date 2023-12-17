import React from 'react'
import Home from '../../../../components/portfolio/Home'
import { getServerSession } from 'next-auth/next';
import { options } from '../../../api/auth/[...nextauth]/options'
const baseURL = process.env.BASE_URL 
import axios from 'axios';


const fetchData = async (slug) => {
  const result = await axios(`${baseURL}/user/info/${slug}`);
  return result.data;
}



const page = async({ params }) => {
  const session = await getServerSession(options)
  const user = session?.user
  const data = await fetchData(params.slug)
  return (
    <Home baseURL={baseURL} user={user} data={data}/>
  )
}

export default page