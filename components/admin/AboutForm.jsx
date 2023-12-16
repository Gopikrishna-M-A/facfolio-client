// ... (previous imports)
import { Layout, Menu, Form, Input, Button } from "antd";
import EducationForm from "./EducationForm";
import axios from "axios";
const formItemLayout = {
    labelCol: { span: 6 }, // Adjust the label column span as needed
    wrapperCol: { span: 12 }, // Adjust the wrapper column span as needed
  };
  
  const inputStyle = { width: '100%' };


const AboutForm = ({ initialData, setAboutData, setIsModalVisible, baseURL }) => {
  console.log(initialData);
  const handleFormSubmit = async(values) => {
    const updatedValues = {
      ...values,
      responsibilities: values.responsibilities.split(',').map(item => item.trim()),
      interest: values.interest.split(',').map(item => item.trim()),
      expertise: values.expertise.split(',').map(item => item.trim()),
    };
    
    try {

      const response = await axios.patch(`${baseURL}/about/${initialData._id}`, updatedValues);
      setAboutData(response.data.about);
      setIsModalVisible(false);
      console.log('PATCH request successful:', response.data.about);
    } catch (error) {
      console.error('Error making PATCH request:', error.message);
    }
  };

  return (
    <Form onFinish={handleFormSubmit} {...formItemLayout}>
    <Form.Item label="User Tag" name="userTag" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>
    <Form.Item label="Quote" name="quote" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>
    <Form.Item label="LinkedIn URL" name="linkedinurl" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>
    <Form.Item label="Twitter URL" name="twitterurl" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>
    <Form.Item label="GitHub URL" name="githuburl" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>
    <Form.Item label="interest" name="interest" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>
    <Form.Item label="responsibilities" name="responsibilities" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>
    <Form.Item label="expertise" name="expertise" rules={[{ required: true }]}>
      <Input style={inputStyle} />
    </Form.Item>

    <Form.Item label="Education" wrapperCol={{ span: 24 }}>
        <EducationForm />
      </Form.Item>

    {/* Other fields like interest, responsibilities, education, expertise */}
    <Form.Item wrapperCol={{ span: 24 }}>
      <Button type="primary" htmlType="submit">
        Save
      </Button>
    </Form.Item>
  </Form>
  );
};

export default AboutForm;
