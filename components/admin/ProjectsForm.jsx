// ... (previous imports)
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import PublicationForm from './PublicationForm';
import axios from 'axios';

const ProjectForm = ({ current, projectData, setProjectData, setIsModalVisible, baseURL, editMode }) => {
    const handleFormSubmit = async(values) => {
      const newData = {
        ...values,
        tags: values.tags.split(',').map(item => item.trim()),
        fundingSources: values.fundingSources.split(',').map(item => item.trim()),
        collaborators: values.collaborators.split(',').map(item => item.trim()),
        publications: values.publications.map(publication => ({
          ...publication,
          authors: publication.authors.split(',').map(item => item.trim())
        }))
      };

      if (editMode) {
        try {
          const response = await axios.patch(`${baseURL}/project/${projectData[current]._id}`, newData);
          const updatedData = [...projectData];
          updatedData[current] = response.data.project;
          setProjectData(updatedData); 
          setIsModalVisible(false);
          console.log('PATCH request successful:', response.data);
        } catch (error) {
          console.error('Error making PATCH request:', error.message);
        }
      }else { 
        const valuesWithUser = {
          ...values,
          user: projectData[0].user
        };
        console.log("valuesWithUser", valuesWithUser);
        try {
          const response = await axios.post(`${baseURL}/project/`, valuesWithUser); 
          setProjectData((prevBlogData) => [...prevBlogData, response.data.project]);         
          setIsModalVisible(false);
          console.log('POST request successful:', response.data.project);
        } catch (error) {
          console.error('Error making POST request:', error.message);
        }
      }
    };
  
    return (
      <Form onFinish={handleFormSubmit}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder={projectData[current].title}/>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder={projectData[current].description}/>
        </Form.Item>
        <Form.Item label="Project Link" name="link">
          <Input placeholder={projectData[current].link}/>
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Input placeholder={projectData[current].tags}/>
        </Form.Item>
        <Form.Item label="FundingSources" name="fundingSources">
          <Input placeholder={projectData[current].fundingSources}/>
        </Form.Item>
        <Form.Item label="FundingAmount" name="fundingAmount">
          <InputNumber placeholder={projectData[current].fundingAmount}/>
        </Form.Item>
        <Form.Item label="Collaborators" name="collaborators">
          <Input placeholder={projectData[current].collaborators}/>
        </Form.Item>
        <Form.Item label="startDate" name="startDate">
          <DatePicker placeholder={projectData[current].startDate}/>
        </Form.Item>
        <Form.Item label="endDate" name="endDate">
          <DatePicker placeholder={projectData[current].endDate}/>
        </Form.Item>


        <Form.Item label="Publications" >
        <PublicationForm />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default ProjectForm;
  
