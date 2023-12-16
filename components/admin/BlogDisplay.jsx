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
import Image from "next/image";
import BlogForm from "./BlogForm";
import axios from "axios";

const { Title, Paragraph, Text } = Typography;

const BlogDisplay = ({ userData, baseURL }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const mockBlogData = [
    {
      user: userData.user._id,
      imageUrl: "https://example.com/image.jpg",
      title: "Mock Blog Title",
      para: "This is a mock blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      link: "https://example.com/blog-post",
    },
  ];

  useEffect(() => {
    setBlogData(userData.blog);
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
          const res = await axios.delete(`${baseURL}/blog/${id}`);
          console.log(res.data);
          const newBlogData = blogData.filter((blog) => blog._id !== id);
          setBlogData(newBlogData);
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

  const updateVisible = async (blogId, isVisible) => {
    try {
      const res = await axios.patch(`${baseURL}/blog/${blogId}`, { isVisible });
      
      setBlogData((prevBlogData) =>
        prevBlogData.map((blog) =>
          blog._id === blogId ? { ...blog, isVisible } : blog
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
        Add Blog
      </Button>

      {blogData?.map((blog, index) => (
        <Card
          key={blog._id}
          className={!blog.isVisible  ? 'card-hidden admin-card' : 'admin-card'}
          actions={[
            blog.isVisible ? (
              <EyeInvisibleOutlined onClick={() => updateVisible(blog._id, false)} />
            ) : (
              <EyeOutlined onClick={() => updateVisible(blog._id, true)} />
            ),
            <EditOutlined key="edit" onClick={() => handleEditClick(index)} />,
            <DeleteOutlined onClick={() => handleDeleteClick(blog._id)} />,
          ]}
          cover={
            <img
              className="blog-img"
              src={blog.imageUrl}
              alt="blog"
              width={240}
              height={240}
            />
          }
        >
          <div className="box" key={index}>
            {blog.title && (
              <Title className="gradient-text" level={2}>
                {blog.title}
              </Title>
            )}
            <div>{blog.para && <Text>{blog.para}</Text>}</div>
            {blog.link && (
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            )}
          </div>
        </Card>
      ))}

      <Modal
        title={editMode ? "Edit Blog" : "Add New Blog"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <BlogForm
          current={editMode ? current : 0} // Pass the index of the research to edit
          blogData={editMode ? blogData : mockBlogData} // Pass initial data to the form if needed
          setBlogData={setBlogData} // Pass the function to update the data
          setIsModalVisible={setIsModalVisible} // Pass the function to close the modal
          baseURL={baseURL}
          editMode={editMode}
        />
      </Modal>
    </div>
  );
};

export default BlogDisplay;
