'use client'
import { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Divider } from 'antd';
import Image from 'next/image';
import axios from 'axios';

const { Title, Paragraph, Link } = Typography;

const BlogPage = ({ baseURL, user }) => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = window.location.pathname;
  const parts = url.split("/");
  const slug = parts[parts.length - 2];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios(`${baseURL}/user/info/${slug}`);
        setProfile(result.data.blog);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(profile);


  const blogPosts = [
    {
      title: 'Getting Started with React Hooks',
      summary: 'Learn the basics of React Hooks and how to use them in your functional components.',
      link: '/blog/react-hooks-intro',
      imageUrl: '/images/blog.jpeg',
    },
    {
      title: 'CSS-in-JS: A Comprehensive Guide',
      summary: 'Explore different CSS-in-JS libraries and understand how to use them in your React projects.',
      link: '/blog/css-in-js-guide',
      imageUrl: '/images/blog.jpeg',
    },
    {
      title: 'Optimizing Performance in React Applications',
      summary: 'Discover tips and best practices for optimizing the performance of your React applications.',
      link: '/blog/react-performance-optimization',
      imageUrl: '/images/blog.jpeg',
    }
  ];

  const renderBlogCard = (post) => (
    <Col xs={24} sm={24} md={12} lg={8} xl={8} key={post.title} >
      <Card 
      loading={loading}
      className="blog-card" 
      cover={<img className='blog-img' src={'/images/blog.jpeg'}  alt="blog" width={240} height={240} />}
      style={{ height: '100%' }}
      >
        <Title level={4}>{post.title}</Title>
        <Paragraph>{post.para}</Paragraph>
        <Link className='blog-link' href={post.link}>Read More</Link>
      </Card>
    </Col>
  );


  return (
    <div className="blog-page">
      <Row gutter={[16, 16]}>{profile.map((post) => renderBlogCard(post))}</Row>
    </div>
  );
};

export default BlogPage;
