'use client'
import {useState,useEffect} from 'react';
import { Typography, Card, Divider, List, Tag } from 'antd';
import { FundOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;

const ResearchPage = ({ baseURL, user }) => {

  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = window.location.pathname;
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
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(profile);


  // const fundingData = [
  //   { title: "Research Grant - Solar Corona Analysis", amount: "₹50,000" },
  //   { title: "Innovation Fund - Deep Learning for Image Recognition", amount: "₹80,000" },
  //   { title: "Environmental Research Fund - Vegetation Detection", amount: "₹60,000" }
  // ];





  return (
    <div>

      {profile?.map((paper, index) => (
  <Card 
    loading={loading}
  key={index} style={{ marginBottom: '16px' }}>
    <Title level={3}><span className='gradient-text'>{paper.title}</span></Title>
    <Text strong>{paper.subtitle}</Text>
    <Divider />
    <Text>{paper.para}</Text>
    <List
      dataSource={[paper.point1, paper.point2, paper.point3]}
      renderItem={(item, i) => <List.Item key={i}>&bull; {item}</List.Item>}
    />
  </Card>
)) ?? (
  <p>Loading...</p>
)}

      {/* <Title level={3}><span className='gradient-text'>Funding</span></Title>
      <List
        dataSource={fundingData}
        renderItem={renderFundingItem}
      /> */}
      {/* <div className="funded-projects">
      <Title level={3}><span className='gradient-text'>Funded Projects</span></Title>
      <Divider />

      <List
        dataSource={fundingData}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<span>{item.title}</span>}
              description={<span>Amount: {item.amount}</span>}
            />
          </List.Item>
        )}
      />
    </div> */}
    </div>
  );
};

export default ResearchPage;
