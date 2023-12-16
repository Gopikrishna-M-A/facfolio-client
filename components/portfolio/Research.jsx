"use client";
import { useState, useEffect } from "react";
import { Typography, Card, Divider, List, Tag } from "antd";
import {  } from "@ant-design/icons";
import axios from "axios";
import { usePathname } from "next/navigation";
const { Title, Text } = Typography;

const ResearchPage = ({ baseURL, user }) => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = usePathname();
  const parts = url.split("/");
  const slug = parts[parts.length - 2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios(`${baseURL}/user/info/${slug}`);
        setProfile(result.data.research);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(profile);

  return (
    <div>
      {profile?.map((paper, index) => (
        <Card
          // loading={loading}
          key={index}
          style={{ marginBottom: "16px" }}
        >
          <Title level={3}>
            <span className="gradient-text">{paper.title}</span>
          </Title>
          <Text strong>{paper.subtitle}</Text>
          <Divider />
          <Text>{paper.para}</Text>
          <List
            dataSource={[paper.point1, paper.point2, paper.point3]}
            renderItem={(item, i) => (
              <List.Item key={i}>&bull; {item}</List.Item>
            )}
          />
        </Card>
      )) ?? <p>Loading...</p>}
    </div>
  );
};

export default ResearchPage;
