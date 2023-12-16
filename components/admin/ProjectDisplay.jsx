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
import ProjectForm from "./ProjectsForm"; // Import your ProjectForm component

const { Title, Paragraph, Text } = Typography;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

const ProjectDisplay = ({ userData, baseURL }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const mockProjectData = [
    {
      user: userData.user._id, // Replace with a valid ObjectId for the user
      title: "Mock Project Title",
      description: "This is a mock project description.",
      link: "https://example.com/project",
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // Set end date 30 days from now
      tags: ["Mock Tag1", "Mock Tag2"],
      fundingSources: ["Mock Funding Source1", "Mock Funding Source2"],
      fundingAmount: 50000,
      collaborators: ["Collaborator1", "Collaborator2"],
      publications: [
        {
          title: "Mock Publication Title",
          authors: ["Author1", "Author2"],
          conference: "Mock Conference",
          year: 2022,
        },
      ],
    },
  ];

  useEffect(() => {
    setProjectData(userData.project);
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
          const res = await axios.delete(`${baseURL}/project/${id}`);
          console.log(res.data);
          const newData = projectData.filter((project) => project._id !== id);
          setProjectData(newData);
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


  const updateVisible = async (projectId, isVisible) => {
    try {
      const res = await axios.patch(`${baseURL}/project/${projectId}`, { isVisible });
      
      setProjectData((prevProjectData) =>
        prevProjectData.map((project) =>
          project._id === projectId ? { ...project, isVisible } : project
        )
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
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
        Add Project
      </Button>

      {projectData?.map((project, index) => (
        <Card
          key={project._id}
          className={!project.isVisible  ? 'card-hidden admin-card' : 'admin-card'}
          actions={[
            project.isVisible ? (
              <EyeInvisibleOutlined onClick={() => updateVisible(project._id, false)} />
            ) : (
              <EyeOutlined onClick={() => updateVisible(project._id, true)} />
            ),
            <EditOutlined key="edit" onClick={() => handleEditClick(index)} />,
            <DeleteOutlined onClick={() => handleDeleteClick(project._id)} />,
          ]}
        >
          <div className="box" key={index}>
            <Title className="gradient-text" level={2}>
              {project.title}
            </Title>
            <div>
              {project.description && <Text>{project.description}</Text>}
            </div>
            <div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Project Link
                </a>
              )}
            </div>
            {project.startDate && project.endDate && (
              <Text>
                <strong>Start Date:</strong>{" "}
                {` ${formatDate(project.startDate)},`}{" "}
                <strong>End Date:</strong> {` ${formatDate(project.endDate)}`}
              </Text>
            )}
            {project.tags && (
              <div>
                <strong>Tags:</strong> {project.tags.join(", ")}
              </div>
            )}
            {project.fundingSources && (
              <div>
                <strong>Funding Sources:</strong>{" "}
                {project.fundingSources.join(", ")}
              </div>
            )}
            {project.fundingAmount && (
              <div>
                <strong>Funding Amount:</strong> ₹{project.fundingAmount}
              </div>
            )}
            {project.collaborators && (
              <div>
                <strong>Collaborators:</strong>{" "}
                {project.collaborators.join(", ")}
              </div>
            )}
            {project.publications && (
              <div>
                <strong>Publications:</strong>
                {project.publications.map((publication, pubIndex) => (
                  <div key={pubIndex}>
                    {`${publication.title} (${
                      publication.year
                    }) - ${publication.authors.join(", ")} - ${
                      publication.conference
                    }`}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}

      <Modal
        title={editMode ? "Edit Project" : "Add New Project"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ProjectForm
          current={editMode ? current : 0} // Pass the index of the research to edit
          projectData={editMode ? projectData : mockProjectData} // Pass initial data to the form if needed
          setProjectData={setProjectData} // Pass the function to update the data
          setIsModalVisible={setIsModalVisible} // Pass the function to close the modal
          baseURL={baseURL}
          editMode={editMode}
        />
      </Modal>
    </div>
  );
};

export default ProjectDisplay;
``;
