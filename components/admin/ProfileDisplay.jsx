import React, { useState, useEffect } from "react";
import { Card, Typography, Button, Modal } from "antd";
import ProfileForm from "./ProfileForm";
import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const ProfileDisplay = ({ userData, baseURL }) => {
  const [profileData, setprofileData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const setdata = async () => {
      setprofileData(userData.user);
    };
    setdata();
  }, []);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      {profileData ? (
        <Card
          actions={[
            // <SettingOutlined key="setting" />,
            profileData.isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />,
            <EditOutlined key="edit" onClick={handleEditClick} />,
            // <SettingOutlined />,
          ]}
        >
          <div style={{
            display: "flex",
            flexDirection:"column",
            justifyContent: "space-between",
            textAlign: "left",
          }}
          >
            <div style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "10px",

            }}>
              <img
                src={profileData.imageUrl ? profileData.imageUrl : profileData.authImageUrl}
                alt="profile"
                width={50}
                height={50}
                style={{ borderRadius: "20px" }}
              />
              <h5 className="gradient-text">{profileData.name}</h5>
            </div>
            <p>
              <strong>Email : </strong>
              {profileData.email}
            </p>
            <p>
              <strong>Phone : </strong>
              {profileData.phone}
            </p>
            <p>
              <strong>Slug : </strong>
              {profileData.slug}
            </p>
            
          </div>

          {/* Edit Home Modal */}
          <Modal
            title="Edit Home"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <ProfileForm
              baseURL={baseURL}
              initialData={profileData} // Pass initial data to the form if needed
              setprofileData={setprofileData} // Pass the function to update the data
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

export default ProfileDisplay;
