import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Modal, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AboutForm from './AboutForm'; // Import your AboutForm component
import axios from 'axios';
const { Title, Paragraph, Text } = Typography;



const AboutDisplay = ({ userData, baseURL }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [isVisible, setIsVisible] = useState();

  useEffect(() => {
    setAboutData(userData.about);
    setIsVisible(userData.about.isVisible);
  }, []);

  useEffect(() => {
    const updateVisible = async() => {
      try {
        const res = await axios.patch(`${baseURL}/about/${aboutData._id}`, { isVisible });
      }catch(err){
        console.log(err);
      }
    }
    updateVisible();
  }, [isVisible]);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



 
  return (
    <div>
      {aboutData ? (
        <Card
        className={!isVisible && 'card-hidden'}
        actions={[
            isVisible ? <EyeInvisibleOutlined onClick={()=>setIsVisible((prev) => !prev)} /> : <EyeOutlined onClick={()=>setIsVisible((prev) => !prev)}/>,
            <EditOutlined key="edit" onClick={handleEditClick}/>,
            <SettingOutlined />
          ]} 
        >
          <Title className='gradient-text' level={2}>{aboutData.userTag}</Title>
        <Text italic>"{aboutData.quote}"</Text>
        {/* Display other About data as needed */}
        <div>
          <Button type='text'><strong>Interests:</strong></Button> {aboutData.interest.join(', ')}
        </div>
        <div>
          <Button type='text'><strong>Responsibilities:</strong></Button> {aboutData.responsibilities.join(', ')}
        </div>
        <div>
          <Button type='text'><strong>LinkedIn:</strong></Button> <Button type='link' href={aboutData.linkedinurl}>{aboutData.linkedinurl}</Button>
        </div>
        <div>
          <Button type='text'><strong>Twitter:</strong></Button> <Button type='link' href={aboutData.twitterurl}>{aboutData.twitterurl}</Button>
        </div>
        <div>
          <Button type='text'><strong>GitHub:</strong></Button> <Button type='link' href={aboutData.githuburl}>{aboutData.githuburl}</Button>
        </div>
        <div>
          <Button type='text'><strong>Education:</strong></Button>
            {aboutData.education.map((edu, index) => (
                <Button block key={index} type='text'>{edu.degree} at {edu.school}, {edu.year}</Button>
            ))}
        </div>
        <div>
          <Button type='text'><strong>Expertise:</strong></Button> {aboutData.expertise.join(', ')}
        </div>
          {/* Display other About data as needed */}



          {/* Edit About Modal */}
          <Modal
            title="Edit About"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <AboutForm
              initialData={aboutData} // Pass initial data to the form if needed
              setAboutData={setAboutData} // Pass the function to update the data
              setIsModalVisible={setIsModalVisible} // Pass the function to close the modal
              baseURL={baseURL}
            />
          </Modal>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AboutDisplay;
