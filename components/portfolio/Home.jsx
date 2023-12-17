'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { Button, Skeleton } from 'antd'
import Image from 'next/image'
import axios from 'axios';

const Home = ({ baseURL, user, data }) => {

  const [profile, setProfile] = useState(data);
  const [loading, setLoading] = useState(false);

  
  return (
    <div className="Home">
    <div className="profile-img-wrapper">
      {/* <Image src="/images/profile.jpeg" alt="profile" width={240} height={240} /> */}
      <img src={loading ? '/images/placeholder.jpg' : profile.user.imageUrl ? profile.user.imageUrl : profile.user.authImageUrl} alt="profile"  />
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




