'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Button, Skeleton } from 'antd'
import Image from 'next/image'
import axios from 'axios';

const Home = ({ baseURL, user }) => {

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = window.location.pathname;
  const parts = url.split("/");
  const slug = parts[parts.length - 2];
  // const slug = 'john-doe'


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios(`${baseURL}/user/info/${slug}`);
        setProfile(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  


  
  return (
    <div className="Home">
    <div className="profile-img-wrapper">
      {/* <Image src="/images/profile.jpeg" alt="profile" width={240} height={240} /> */}
      <img src={loading ? '/images/placeholder.jpg' : profile.user.authImageUrl} alt="profile"  />
    </div>
    { loading ? <Skeleton active style={{ width: 500 }}/> : <div className="cta-heading profile-heading"><span className='gradient-text'>Hello, I'm {profile?.user?.name?.split(' ')[0]},</span> {profile?.home?.ctaheading}</div>}
    { loading ? <Skeleton.Input active style={{ width: 100 }}/> : <p className="profile-para">{profile?.home?.ctapara}</p>}
    
    <div className="cta-btn-wrapper">
      <Button className="cta-btn" type="primary" size="large">GET IN TOUCH</Button>
      <Button className="cta-btn"  size="large">VIEW ALL WORKS</Button>
    </div>
  </div>
  );
};

export default Home;




