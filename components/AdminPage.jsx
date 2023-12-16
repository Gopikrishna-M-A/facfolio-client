"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import HomeDisplay from "./admin/HomeDisplay";
import AboutDisplay from "./admin/AboutDisplay";
import ResearchDisplay from "./admin/ResearchDisplay";
import ProjectDisplay from "./admin/ProjectDisplay";
import BlogDisplay from "./admin/BlogDisplay";
import ProfileDisplay from "./admin/ProfileDisplay";
import ThemeCustomization from "./admin/ThemeCustomization";

import { Button, message, Steps, theme, Typography } from "antd";
const { Title } = Typography;
import { LinkOutlined } from "@ant-design/icons";

const AdminPage = ({ user, baseURL }) => {
  const [current, setCurrent] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${baseURL}/user/info/${user.slug}`);
      const data = await response.data;
      // console.log("data",data);
      setUserData(data);
    };
    fetchUser();
  }, [current]);

  const steps = [
    {
      title: "Profile",
      content: <ProfileDisplay userData={userData} baseURL={baseURL} />,
    },
    {
      title: "Theme",
      content: <ThemeCustomization userData={userData} />,
    },
    {
      title: "Home",
      content: <HomeDisplay userData={userData} baseURL={baseURL} />,
    },
    {
      title: "About",
      content: <AboutDisplay userData={userData} baseURL={baseURL} />,
    },
    {
      title: "Research",
      content: <ResearchDisplay userData={userData} baseURL={baseURL} />,
    },
    {
      title: "Project",
      content: <ProjectDisplay userData={userData} baseURL={baseURL} />,
    },
    {
      title: "Blog",
      content: <BlogDisplay userData={userData} baseURL={baseURL} />,
    },
    {
      title: "Contact",
      content: "Contact Customization",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };



  return (
    <>
      <Title style={{margin:"0px"}} level={1}>{userData?.user?.name}</Title>
      <Button target="_blank" style={{marginBottom:"20px",padding:0}} href={`/portfolio/${userData?.user?.slug}/home`} type="link" icon={<LinkOutlined />}> Go to Portfolio</Button>
      <div
        className="dashboard"
        style={{ display: "flex", alignItems: "flex-start" }}
      >
        <Steps
          current={current}
          items={items}
          direction="vertical"
          onChange={onChange}
        />
        <div style={{ width: "100%" }}>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
