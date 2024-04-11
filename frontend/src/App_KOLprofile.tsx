import React, { useEffect, useState } from 'react';
import { Typography, Card, Layout, Row, Col, Button } from 'antd';

import axios from 'axios';
import './App_KOLprofile.css';
import ProfilePicture from './ProfilePicture';
import ProfileInfo from './ProfileInfo';
import EngagementHistory from './EngagementHistory';
import DemoRadar from './DimensionScore';
import Rating from './Rating';
import EditableText from './EditableText';
import { postData } from './service/http';
import logo from './assets/Genmab_Logo_Color_RGB.jpg';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

// Define TypeScript interfaces for your data structures
interface Score {
  dimension: string;
  score: number;
}

interface Rating {
  dimension: string;
  rating: number;
}

interface Engagement {
  profileID: string;
  engagementID: string;
  engagementA: string;
  functionA: string;
  notes: string;
  followUpRequested: string;
  functionB: string;
  informationRequested: string;
}

interface Profile {
  id: string,
  imageUrl: string;
  name: string;
  location: string;
  occupation: string;
  institution: string;
  email: string;
  history: Engagement[];
  scores: Score[];
  ratings: Rating[];
}

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    // Initialize with empty or placeholder values
    id: '-1',
    imageUrl: '',
    name: '',
    location: '',
    occupation: '',
    institution: '',
    email: '',
    history: [],
    scores: [],
    ratings: [],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace 'profileId' with actual logic to retrieve or define the ID
        const profileId = '80';
        const response = await postData(`/getProfile/${profileId}`);
        const profileData = await response.json();
        console.log('Profile Data:', profileData);

        const mappedProfile: Profile = {
          id: profileId,
          imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg&_gl=1*13kff3c*_ga*MTcyODI3MDk5My4xNzEyNzQxODk0*_ga_8JE65Q40S6*MTcxMjc0MTg5My4xLjEuMTcxMjc0MTg5OC4wLjAuMA..', // Placeholder value for now
          name: `${profileData.firstName} ${profileData.lastName}`,
          location: `${profileData.city}, ${profileData.state}`,
          occupation: 'placeholder', // Placeholder value for now
          institution: profileData.institute,
          email: profileData.email, // Placeholder value for now
          history: profileData.engagements || [],
          scores: [],
          ratings: []
        };

        setProfile(mappedProfile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array means this effect runs once on mount


  //處理個人profile的變化
  const handleProfileChange = (field: keyof Profile, value: string | string[]) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  //處理engagement hisory的變化
  const handleHistoryChange = (index: number, field: keyof Engagement, newValue: string) => {
    const updatedHistory = profile.history.map((engagement, idx) =>
      idx === index ? { ...engagement, [field]: newValue } : engagement
    );
    setProfile((prevProfile) => ({
      ...prevProfile,
      history: updatedHistory,
    }));
  };

  const saveProfile = async () => {
    try {
      console.log('Profile:', profile);
      const response = await axios.post('/updateProfile', profile);
      console.log('Profile saved successfully', response.data);
      // Optionally, display a success notification to the user
    } catch (error) {
      console.error('Failed to save profile', error);
      // Optionally, display an error notification to the user
    }
  };

  const saveHistory = async () => {
    try {
      console.log('History:', profile.history);
      const response = await axios.post('/updateHistory', { history: profile.history });
      console.log('History saved successfully', response.data);
      // Optionally, display a success notification to the user
    } catch (error) {
      console.error('Failed to save history', error);
      // Optionally, display an error notification to the user
    }
  };

  return (
    <Layout className="layout">
      <Header>
        {/* <div className="logo">
          <img src={logo} alt="KOL Profile" style={{ maxWidth: '100%', maxHeight: '64px' }} />
        </div> */}
        <Typography.Title level={1} style={{ color: "teal", lineHeight: '32px', marginLeft: '20px' }}>KOL Profile</Typography.Title>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ProfilePicture imageUrl={profile.imageUrl} />
            </Col>
            <Col span={12}>
              <Card className="Profile-Details" title={<Title level={4} style={{ marginBottom: 0 }}>Profile Details</Title>} bordered={false}>
                <div className="editable-field">
                  <label className="profile-detail-label">Name: </label>
                  <Typography.Text
                    editable={{
                      onChange: (newText) => handleProfileChange('name', newText),
                    }}
                  >
                    {profile.name}
                  </Typography.Text>
                </div>
                <div className="editable-field">
                  <label className="profile-detail-label">Location: </label>
                  <Typography.Text
                    editable={{
                      onChange: (newText) => handleProfileChange('location', newText),
                    }}
                  >
                    {profile.location}
                  </Typography.Text>
                </div>
                <div className="editable-field">
                  <label className="profile-detail-label">Occupation: </label>
                  <Typography.Text
                    editable={{
                      onChange: (newText) => handleProfileChange('occupation', newText),
                    }}
                  >
                    {profile.occupation}
                  </Typography.Text>
                </div>
                <div className="editable-field">
                  <label className="profile-detail-label">Institution: </label>
                  <Typography.Text
                    editable={{
                      onChange: (newText) => handleProfileChange('institution', newText),
                    }}
                  >
                    {profile.institution}
                  </Typography.Text>
                </div>
                <div className="editable-field">
                  <label className="profile-detail-label">Email: </label>
                  <Typography.Text
                    editable={{
                      onChange: (newText) => handleProfileChange('email', newText),
                    }}
                  >
                    {profile.email}
                  </Typography.Text>
                </div>
                {/* 在 App 组件的 return 方法中添加保存按钮 */}
                <div className="profile-save-button">
                  <Button type="primary" onClick={saveProfile}>Save Profile</Button>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="Engagement-History" title={<Title level={4} style={{ marginBottom: 0 }}>Engagement History</Title>} bordered={false}>
                {profile.history.map((engagement, index) => (
                  <Card key={index} className="engagement-card" bordered={false}>
                    <Typography.Title level={5} className="engagement-title">Engagement {index + 1}</Typography.Title>
                    <ul className="engagement-details">
                      <li>
                        <Typography.Text strong>Engagement A: </Typography.Text>
                        {engagement.engagementA}
                      </li>
                      {engagement.functionA && (
                        <li>
                          <Typography.Text strong>Function A: </Typography.Text>
                          {engagement.functionA}
                        </li>
                      )}
                      <li>
                        <Typography.Text strong>Notes: </Typography.Text>
                        <Typography.Text editable={{ onChange: (newText) => handleHistoryChange(index, 'notes', newText) }}>
                          {engagement.notes || 'N/A'}
                        </Typography.Text>
                      </li>
                      {engagement.followUpRequested && (
                        <li>
                          <Typography.Text strong>Follow Up Requested: </Typography.Text>
                          {engagement.followUpRequested}
                        </li>
                      )}
                      {engagement.functionB && (
                        <li>
                          <Typography.Text strong>Function B: </Typography.Text>
                          {engagement.functionB}
                        </li>
                      )}
                      {engagement.informationRequested && (
                        <li>
                          <Typography.Text strong>Information Requested: </Typography.Text>
                          {engagement.informationRequested}
                        </li>
                      )}
                    </ul>
                  </Card>

                ))}

                {/* 在 App 组件的 return 方法中添加保存按钮 */}
                <div className="history-save-button">
                  <Button type="primary" onClick={saveHistory}>Save History</Button>
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card className="Dimension-Scores" title={<Title level={4} style={{ marginBottom: 0 }}>Dimension Scores</Title>} bordered={false}>
                <DemoRadar />
              </Card>
            </Col>
            <Col span={12}>
              <Card className="Ratings" title={<Title level={4} style={{ marginBottom: 0 }}>Ratings</Title>} bordered={false}>
                {/* Ratings content here... */}
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>KOL Profile ©2024 Created by YourName</Footer>
    </Layout>

  );
};

export default App;
