// ... (previous imports)
import { Layout, Menu, Form, Input, Button } from 'antd';
import axios from 'axios';
const HomeForm = ({ initialData, baseURL, setHomeData, setIsModalVisible}) => {
    const handleFormSubmit = async(values) => {
      try {

        const response = await axios.patch(`${baseURL}/home/${initialData._id}`, values);
        setHomeData(response.data.home);
        setIsModalVisible(false);
        console.log('PATCH request successful:', response.data.home);
      } catch (error) {
        console.error('Error making PATCH request:', error.message);
      }
    };
    
    return (
      <Form 
      initialValues={initialData}
      onFinish={handleFormSubmit}>
        <Form.Item  label="CTA Heading" name="ctaheading" rules={[{ required: true }]}>
          <Input  placeholder={initialData.ctaheading}/>
        </Form.Item>
        <Form.Item label="CTA Paragraph" name="ctapara" rules={[{ required: true }]}>
          <Input.TextArea placeholder={initialData.ctapara}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default HomeForm;
  