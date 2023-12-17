'use client'
import { useEffect, useState } from 'react';
import { Typography, Card, Row, Col, Divider } from 'antd';
import Image from 'next/image';
import axios from 'axios';

const { Title, Paragraph, Link } = Typography;

const BlogPage = ({ baseURL, user, data }) => {
  const [profile, setProfile] = useState(data.blog);
  const [loading, setLoading] = useState(false);


  const renderBlogCard = (post) => (
    <Col xs={24} sm={24} md={12} lg={8} xl={8} key={post.title} >
      <Card 
      loading={loading}
      className="blog-card" 
      cover={<img className='blog-img' src={post.imageUrl}  alt="blog" width={240} height={240} />}
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
