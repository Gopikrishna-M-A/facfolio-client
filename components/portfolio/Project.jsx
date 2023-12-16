"use client";
import React, { useState, useEffect } from "react";
import { Card, Typography, Col, Row, Tag } from "antd";
import axios from "axios";

const { Title, Paragraph, Link } = Typography;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};


const ProjectCard = ({ baseURL, user}) => {
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
        setProfile(result.data.project);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // console.log(profile);

  return (
    <Row gutter={[16, 16]}>
      {profile.map((project) => (
        <Col xs={24} sm={24} md={12} lg={8} xl={8} key={project.title}>
          <Card 
            loading={loading}
          className="project-card">
            <div className="project-card-content">
              <Title level={4}>
                <span className="gradient-text">{project.title}</span>
              </Title>
              <Paragraph>{project.description}</Paragraph>
              <Link className="project-link" href={project.githubLink}>
                View Project
              </Link>

              {/* Additional Project Details */}
              <div>
                <Tag style={{ margin: "10px 10px 0 0" }} color="blue">
                  {formatDate(project.startDate)} -{" "}
                  {formatDate(project.endDate)}
                </Tag>
                {project.tags &&
                  project.tags.map((tag) => (
                    <Tag style={{ margin: "10px 10px 0 0" }} key={tag}>
                      {tag}
                    </Tag>
                  ))}
              </div>

              {/* Funding Details */}
              {project.fundingAmount && (
                <div>
                  <Title level={5}>Funding</Title>
                  <Paragraph>{`Sources: ${project.fundingSources.join(
                    ", "
                  )}`}</Paragraph>
                  <Paragraph>
                    {`Amount: ${project.fundingAmount} INR`}{" "}
                  </Paragraph>
                </div>
              )}

              {/* Collaborators */}
              {project.collaborators && (
                <div>
                  <Title level={5}>Collaborators</Title>
                  <Paragraph>{project.collaborators.join(", ")}</Paragraph>
                </div>
              )}

              {/* Publications */}
              {project.publications && (
                <div>
                  <Title level={5}>Publications</Title>
                  <ul>
                    {project.publications.map((publication, index) => (
                      <li key={index}>
                        <Paragraph>
                          {publication.title}, {publication.authors.join(", ")},{" "}
                          {publication.conference} ({publication.year})
                        </Paragraph>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProjectCard;
