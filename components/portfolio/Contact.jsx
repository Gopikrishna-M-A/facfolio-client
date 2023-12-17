"use client";
import { useState, useEffect } from "react";
import { Typography, Form, Input, Button, Row, Col } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import axios from "axios";
const { Title, Text } = Typography;

const ContactPage = ({ baseURL, user, data }) => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };
  const [profile, setProfile] = useState(data.user);
  const [loading, setLoading] = useState(false);
  
  const url = window.location.pathname;
  const parts = url.split("/");
  const slug = parts[parts.length - 2];


  return (
    <Row gutter={[16, 16]} className="contact-page">
      {/* Left Section */}
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className="contact-left">
          <div className="cta-heading gradient-text">Get in touch</div>
          <p>
            Have a project in mind? Looking to partner or work together? Reach
            out through the form, and I'll get back to you in the next 48 hours.
          </p>
          <div className="contact-links-wrapper">
            <div className="contact-link">
              <div className="about-social-icon">
                <MailOutlined />
              </div>
              <Text>{profile.email}</Text>
            </div>
            <div className="contact-link">
              <div className="about-social-icon">
                <PhoneOutlined />
              </div>
              <Text>{profile.phone}</Text>
            </div>
          </div>
        </div>
      </Col>

      {/* Right Section */}
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <div className="contact-right">
          <Form 
          size="large"
          name="contact-form" 
          onFinish={onFinish} 
          layout="vertical">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea placeholder="Your Message" rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ContactPage;
