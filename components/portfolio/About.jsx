"use client";
import { useState, useEffect } from "react";
import { Typography, Card, Row, Col, Divider, Tag } from "antd";
import {
  UserOutlined,
  BookOutlined,
  AuditOutlined,
  IdcardOutlined,
  ClusterOutlined,
  LinkedinFilled,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const { Title, Text } = Typography;

const AboutSection = ({ baseURL, user}) => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = window.location.pathname;
  const parts = url.split("/");
  const slug = parts[parts.length - 2];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios(`${baseURL}/user/info/${slug}`);
        setProfile(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log(profile);

  return (
    <div className="about-section">
      <Row gutter={[16, 16]}>
        {/* Professor's Profile Card */}
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Card
            loading={loading}
            cover={
              // <Image
              //   className="about-img"
              //   src="/images/profile.jpeg"
              //   alt="profile"
              //   width={240}
              //   height={240}
              // />
              loading ? 
                <img src={'/images/placeholder.jpg'} alt="profile"/> 
                : <img src={profile.user.authImageUrl} alt="profile" height={240} style={{objectFit:"cover",objectPosition:"center"}}/>
              
            }
            style={{ height: "100%" }}
          >
            <Title level={2}>
              Hi, I am <br />{" "}
              <span className="gradient-text">
                {profile?.user?.name || "..."}
              </span>
            </Title>
            <Text>{profile?.about?.userTag || "..."}</Text>
            <div className="about-social-wrapper">
              <Link
                style={{ color: "#000" }}
                href={profile?.about?.linkedinurl || "/"}
                className="about-social-icon"
              >
                <LinkedinFilled />
              </Link>
              <Link
                style={{ color: "#000" }}
                href={profile?.about?.twitterurl || "/"}
                className="about-social-icon"
              >
                <TwitterOutlined />
              </Link>
              <Link
                style={{ color: "#000" }}
                href={profile?.about?.githuburl || "/"}
                className="about-social-icon"
              >
                <GithubOutlined />
              </Link>
            </div>
            <Divider />
            <Text italic>"{profile?.about?.quote || "..."}"</Text>
          </Card>
        </Col>

        {/* Professor's Details */}
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card 
              loading={loading}
              style={{ height: "100%" }}>
                <BookOutlined style={{ fontSize: "24px" }} />
                <Title level={4}>
                  <span className="gradient-text">Interests</span>
                </Title>
                <Text>
                  <ul>
                    {profile?.about?.interest.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Text>
              </Card>
            </Col>

            {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card
              style={{ height: '100%' }}>
                <AuditOutlined style={{ fontSize: '24px' }} />
                <Title level={4}>Quote</Title>
                <Text>"Without struggle there is no progress" - Frederick Douglass</Text>
              </Card>
            </Col> */}

            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card 
              loading={loading}
              style={{ height: "100%" }}>
                <IdcardOutlined style={{ fontSize: "24px" }} />
                <Title level={4}>
                  <span className="gradient-text">Major Responsibilities</span>
                </Title>
                <Text>
                  <ul>
                    {profile?.about?.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card
              loading={loading}
              style={{ height: "100%" }}>
                <IdcardOutlined style={{ fontSize: "24px" }} />
                <Title level={4}>
                  <span className="gradient-text">Educational Details</span>
                </Title>
                <Text>
                  <ul>
                    {profile?.about?.education.map((item, index) => (
                      <li key={index}>
                        <strong>{item.degree}</strong> - {item.school} (
                        {item.year})
                      </li>
                    ))}
                  </ul>
                </Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Card 
              loading={loading}
              style={{ height: "100%" }}>
                <ClusterOutlined style={{ fontSize: "24px" }} />
                <Title level={4}>
                  <span className="gradient-text">Expertise</span>
                </Title>
                <Text>
                  <ul>
                    {profile?.about?.expertise.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </Text>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AboutSection;
