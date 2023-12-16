// ... (previous imports)
import { Layout, Menu, Form, Input, Button } from 'antd';
import axios from 'axios';


const ResearchForm = ({ researchData, setResearchData, setIsModalVisible, baseURL, current, editMode }) => {
    const handleFormSubmit = async(values) => {

      if (editMode) {
        try {
          const response = await axios.patch(`${baseURL}/research/${researchData[current]._id}`, values);
          const updatedData = [...researchData];
          updatedData[current] = { ...updatedData[current], ...values };
          setResearchData(updatedData); 
          setIsModalVisible(false);
          console.log('PATCH request successful:', response.data);
        } catch (error) {
          console.error('Error making PATCH request:', error.message);
        }
      }else {
        try {
          const valuesWithUser = {
            ...values,
            user: researchData[0].user
          };
          const response = await axios.post(`${baseURL}/research/`, valuesWithUser);
          setResearchData((prevBlogData) => [...prevBlogData, response.data.research]);         
          setIsModalVisible(false);
          console.log('POST request successful:', response.data.research);
        } catch (error) {
          console.error('Error making POST request:', error.message);
        }
      }


    };
  
    return (
      <Form 
      onFinish={handleFormSubmit}
      initialValues={researchData[current]}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder={researchData[current].title}/>
        </Form.Item>
        <Form.Item label="Subtitle" name="subtitle">
          <Input placeholder={researchData[current].subtitle}/>
        </Form.Item>
        <Form.Item label="Paragraph" name="para">
          <Input.TextArea placeholder={researchData[current].para}/>
        </Form.Item>
        <Form.Item label="point 1" name="point1">
          <Input placeholder={researchData[current].point1}/>
        </Form.Item>
        <Form.Item label="point 2" name="point2">
          <Input placeholder={researchData[current].point2}/>
        </Form.Item>
        <Form.Item label="point 3" name="point3">
          <Input placeholder={researchData[current].point3}/>
        </Form.Item>
        
       
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default ResearchForm;
  