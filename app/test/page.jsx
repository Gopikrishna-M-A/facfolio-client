'use client';
import React from 'react';
import { Form, Input, Button, Select, DatePicker, Space } from 'antd';

const { Option } = Select;

const CustomForm = () => {
  const onFinish = (values) => {
    // Handle form submission logic here
    console.log('Form values:', values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {/* About Model Fields */}
      <Form.Item label="User Tag" name="userTag" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Quote" name="quote">
        <Input />
      </Form.Item>
      <Form.Item label="LinkedIn URL" name="linkedinurl">
        <Input />
      </Form.Item>
      <Form.Item label="Twitter URL" name="twitterurl">
        <Input />
      </Form.Item>
      <Form.Item label="GitHub URL" name="githuburl">
        <Input />
      </Form.Item>

      {/* Blog Model Fields */}
      <Form.Item label="Blog Title" name="blogTitle" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Blog Para" name="blogPara">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Blog Link" name="blogLink">
        <Input />
      </Form.Item>

      {/* Home Model Fields */}
      <Form.Item label="CTA Heading" name="ctaHeading" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="CTA Paragraph" name="ctaParagraph" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>

      {/* Project Model Fields */}
      <Form.Item label="Project Title" name="projectTitle" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Project Description" name="projectDescription">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Project Link" name="projectLink">
        <Input />
      </Form.Item>
      <Form.Item label="Start Date" name="startDate" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="End Date" name="endDate" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      {/* Add more Project Model Fields as needed */}

      {/* Research Model Fields */}
      <Form.Item label="Research Title" name="researchTitle" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Research Subtitle" name="researchSubtitle">
        <Input />
      </Form.Item>
      <Form.Item label="Research Para" name="researchPara">
        <Input.TextArea />
      </Form.Item>
      {/* Add more Research Model Fields as needed */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
