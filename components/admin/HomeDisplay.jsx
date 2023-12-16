import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Modal } from 'antd';
import HomeForm from './HomeForm'; 
import { EditOutlined, EyeInvisibleOutlined, EyeOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';


const { Title, Paragraph } = Typography;

const HomeDisplay = ({ userData, baseURL }) => {
  const [homeData, setHomeData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const setdata = async () => {
      setHomeData(userData.home)
    }
    setdata()
  }, [])

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {homeData ? (
        <Card
        actions={[
          // <SettingOutlined key="setting" />,
          homeData.isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />,
          <EditOutlined key="edit" onClick={handleEditClick}/>,
          <SettingOutlined />
        ]}
        >
          <Title level={2} className='gradient-text cta-heading'>{homeData.ctaheading}</Title>
          <Paragraph>{homeData.ctapara}</Paragraph>



          {/* Edit Home Modal */}
          <Modal
            title="Edit Home"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <HomeForm
              baseURL={baseURL}
              initialData={homeData} // Pass initial data to the form if needed
              setHomeData={setHomeData} // Pass the function to update the data
              setIsModalVisible={setIsModalVisible} // Pass the function to close the modal
            />
          </Modal>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default HomeDisplay;
