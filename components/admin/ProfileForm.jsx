// ... (previous imports)
import { useState, useEffect } from 'react';
import { Layout, Menu, Form, Input, Button } from 'antd';
import axios from 'axios';


const ProfileForm = ({ initialData, baseURL, setprofileData, setIsModalVisible}) => {
    const [slugs, setSlugs] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await axios.get(`${baseURL}/user`);
                const slugsArray = response.data.map(item => item.slug);
                setSlugs(slugsArray);
               }catch{
                      console.log("error");
               }
        }
        fetchUsers();
    }, []);

    const isSlugUnique = (rule, value, callback) => {
        // Check if the entered slug is present in the array
        if (slugs.includes(value)) {
          callback('Slug already exists. Please choose a different one.');
        } else {
          callback(); // Validation passed
        }
    };

    // console.log("slugs", slugs);


    const handleFormSubmit = async(values) => {
      try {
        const response = await axios.patch(`${baseURL}/user/${initialData._id}`, values);
        setprofileData(response.data.user);
        setIsModalVisible(false);
        console.log('PATCH request successful:', response.data.user);
      } catch (error) {
        console.error('Error making PATCH request:', error.message);
      }
    };
    
    return (
      <Form onFinish={handleFormSubmit}>
        <Form.Item  label="Name" name="name" rules={[{ required: true }]}>
          <Input  placeholder={initialData.name}/>
        </Form.Item>

        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input placeholder={initialData.phone}/>
        </Form.Item>

        <Form.Item label="Slug" name="slug" rules={[{ required: true }, { validator: isSlugUnique }]}>
          <Input placeholder={initialData.slug}/>
        </Form.Item>

        <Form.Item label="Image Url" name="imageUrl" rules={[{ required: true }]}>
          <Input placeholder={initialData.imageUrl}/>
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default ProfileForm;
  