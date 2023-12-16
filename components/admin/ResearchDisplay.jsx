import React, { useEffect, useState } from "react";
import { Card, Typography, Button, Modal, Carousel } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import axios from "axios";

import ResearchForm from "./ResearchForm"; // Import your ResearchForm component

const { Title, Paragraph, Text } = Typography;

const ResearchDisplay = ({ userData, baseURL }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [researchData, setResearchData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const mockResearchData = [
    {
      user: userData.user._id, // Replace with a valid ObjectId for the user
      title: "Mock Research Title",
      subtitle: "Mock Research Subtitle",
      para: "This is a mock research paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      point1: "Mock Research Point 1",
      point2: "Mock Research Point 2",
      point3: "Mock Research Point 3",
    },
  ];

  useEffect(() => {
    setResearchData(userData.research);
  }, []);

  const handleEditClick = (index) => {
    if (index === -1) {
      setEditMode(false);
    } else {
      setEditMode(true);
    }
    setIsModalVisible(true);
    setCurrent(index);
    console.log(index);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteClick = async (id) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this item?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        // User clicked "Yes" in the modal, proceed with deletion
        try {
          const res = await axios.delete(`${baseURL}/research/${id}`);
          console.log(res.data);
          const newData = researchData.filter(
            (research) => research._id !== id
          );
          setResearchData(newData);
        } catch (err) {
          console.log(err);
        }
      },
      onCancel: () => {
        // User clicked "No" or closed the modal, do nothing
        console.log("Deletion canceled");
      },
    });
  };

  return (
    <div className="admin-info">
      <Button
        onClick={() => handleEditClick(-1)}
        icon={<PlusOutlined />}
        block
        type="dashed"
        size="large"
      >
        Add Research
      </Button>

      {researchData?.map((research, index) => (
        <Card
          key={research._id}
          className="admin-card"
          actions={[
            // <SettingOutlined key="setting" />,
            <EditOutlined key="edit" onClick={() => handleEditClick(index)} />,
            <DeleteOutlined onClick={() => handleDeleteClick(research._id)} />,
          ]}
        >
          <div className="box" key={index}>
            <Title className="gradient-text" level={2}>
              {research.title}
            </Title>
            {research.subtitle && <Title level={3}>{research.subtitle}</Title>}
            {research.para && <Text>{research.para}</Text>}
            {research.point1 && (
              <div>
                <strong>1:</strong> {research.point1}
              </div>
            )}
            {research.point2 && (
              <div>
                <strong>2:</strong> {research.point2}
              </div>
            )}
            {research.point3 && (
              <div>
                <strong>3:</strong> {research.point3}
              </div>
            )}
          </div>
        </Card>
      ))}
      <Modal
        title={editMode ? "Edit Research" : "Add New Research"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ResearchForm
          current={editMode ? current : 0} // Pass the index of the research to edit
          researchData={editMode ? researchData : mockResearchData} // Pass initial data to the form if needed
          setResearchData={setResearchData} // Pass the function to update the data
          setIsModalVisible={setIsModalVisible} // Pass the function to close the modal
          baseURL={baseURL}
          editMode={editMode}
        />
      </Modal>
    </div>
  );
};

export default ResearchDisplay;
