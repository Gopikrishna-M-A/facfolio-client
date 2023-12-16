// ... (previous imports)
import { Layout, Menu, Form, Input, Button } from 'antd';
import axios from 'axios';

const BlogForm = ({ current, blogData, setBlogData, setIsModalVisible, baseURL, editMode }) => {
    const handleFormSubmit = async(values) => {
      if (editMode) {
        try {
          const response = await axios.patch(`${baseURL}/blog/${blogData[current]._id}`, values);
          const updatedData = [...blogData];
          updatedData[current] = { ...updatedData[current], ...values };
          setBlogData(updatedData); 
          setIsModalVisible(false);
          console.log('PATCH request successful:', response.data.blog);
        } catch (error) {
          console.error('Error making PATCH request:', error.message);
        }
      }
      else {
        const valuesWithUser = {
          ...values,
          user: blogData[0].user
        };
        try {          
          const response = await axios.post(`${baseURL}/blog/`, valuesWithUser); 
          setBlogData((prevBlogData) => [...prevBlogData, response.data.blog]);         
          setIsModalVisible(false);
          console.log('POST request successful:', response.data.blog);
        } catch (error) {
          console.error('Error making POST request:', error.message);
        }
      }
      
    };

    return (
      <Form 
      initialValues={blogData[current]}
      onFinish={handleFormSubmit}>
        <Form.Item label="Image URL" name="imageUrl">
          <Input placeholder={blogData[current].imageUrl}/>
        </Form.Item>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder={blogData[current].title}/>
        </Form.Item>
        <Form.Item label="Paragraph" name="para">
          <Input.TextArea placeholder={blogData[current].para}/>
        </Form.Item>
        <Form.Item label="Link" name="link">
          <Input placeholder={blogData[current].link}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default BlogForm;
  