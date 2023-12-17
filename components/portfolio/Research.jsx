"use client";
import { useState, useEffect } from "react";
import { Typography, Card, Divider, List, Tag } from "antd";
import {  } from "@ant-design/icons";
import axios from "axios";
import { usePathname } from "next/navigation";
const { Title, Text } = Typography;

const ResearchPage = ({ baseURL, user, data }) => {
  const [profile, setProfile] = useState(data.research);
  const [loading, setLoading] = useState(false);


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
