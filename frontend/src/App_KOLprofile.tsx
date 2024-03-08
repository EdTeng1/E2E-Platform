// App.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import ProfilePicture from './ProfilePicture';
import ProfileInfo from './ProfileInfo';
import EngagementHistory from './EngagementHistory';
import DemoRadar from './DimensionScore';
import Rating from './Rating';
import EditableText from './EditableText';

// Define TypeScript interfaces for your data structures
interface Score {
  dimension: string;
  score: number;
}

interface Rating {
  dimension: string;
  rating: number;
}

interface Profile {
  imageUrl: string;
  name: string;
  location: string;
  occupation: string;
  institution: string;
  overview: string;
  history: string[];
  scores: Score[];
  ratings: Rating[];
}

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    imageUrl: 'https://pic1.zhimg.com/80/v2-5267ed226b0e31ea05cbb7b53eaab494_1440w.webp',
    name: 'John Doe',
    location: 'New Jersey, USA',
    occupation: 'Patient Advocacy',
    institution: 'Genmab',
    overview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    history: ['Research Scientists Meeting on Nov 10 2023', 'Move to Phase 2', 'Responsible physicians come in conducting research'],
    scores: [
      { dimension: 'Congress', score: 80 },
      { dimension: 'Trials', score: 70 },
      { dimension: 'Patients', score: 90 },
      { dimension: 'Digital Posts', score: 20 },
      { dimension: 'Guidelines', score: 5 },
      { dimension: 'Claims', score: 15 },
      { dimension: 'Grants', score: 60 },
    ],
    ratings: [
      { dimension: 'Medical', rating: 4 },
      { dimension: 'Commercial', rating: 3 },
      { dimension: 'Clinical', rating: 5 },
      { dimension: 'Other Area', rating: 3 },
      { dimension: 'Other Area', rating: 3 },
    ],
  });

  //處理個人profile的變化
  const handleProfileChange = (field: keyof Profile, value: string | string[]) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  //處理engagement hisory的變化
  const handleHistoryChange = (index: number, newText: string) => {
    const updatedHistory = [...profile.history];
    updatedHistory[index] = newText;
    setProfile(prevProfile => ({
      ...prevProfile,
      history: updatedHistory,
    }));
  };


  const saveProfile = async () => {
    try {
      // 假设您的 Flask 后端运行在 localhost:5000，并且有一个名为 /updateProfile 的端点
      const response = await axios.post('http://localhost:5000/updateProfile', profile);
      console.log('Profile saved successfully', response.data);
      // 处理成功的反馈（如显示通知）
    } catch (error) {
      console.error('Failed to save profile', error);
      // 处理失败的反馈（如显示错误消息）
    }
  };



  return (
    <div className="app">
    <h1 className="title">KOL Profile</h1>
    <div className="profile">
      <div className="profile-picture">
        <ProfilePicture imageUrl={profile.imageUrl} />
      </div>
      <div className="profile-details">
        <div className="editable-field">
          <label>Name: </label>
          <EditableText
            text={profile.name}
            onTextChange={(newText) => handleProfileChange('name', newText)}
          />
        </div>
        <div className="editable-field">
          <label>Location: </label>
          <EditableText
            text={profile.location}
            onTextChange={(newText) => handleProfileChange('location', newText)}
          />
        </div>
        <div className="editable-field">
          <label>Occupation: </label>
          <EditableText
            text={profile.occupation}
            onTextChange={(newText) => handleProfileChange('occupation', newText)}
          />
        </div>
        <div className="editable-field">
          <label>Institution: </label>
          <EditableText
            text={profile.institution}
            onTextChange={(newText) => handleProfileChange('institution', newText)}
          />
        </div>
        <div className="editable-field">
          <label>Overview: </label>
          <EditableText
            text={profile.overview}
            onTextChange={(newText) => handleProfileChange('overview', newText)}
          />
        </div>
        {/* 在 App 组件的 return 方法中添加保存按钮 */}
        <div className="profile-save-button">
          <button onClick={saveProfile}>Save Profile</button>
        </div>
        <div className="editable-field">
          <h3>Engagement History</h3>
          {profile.history.map((item, index) => (
            <div key={index} className="editable-field">
              <EditableText
                text={item}
                onTextChange={(newText) => handleHistoryChange(index, newText)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 在 App 组件的 return 方法中添加保存按钮 */}
      <div className="profile-save-button">
        <button onClick={saveProfile}>Save Profile</button>
      </div>
      <div className="dimension-score">
        <h1 id='dscore' style={{ fontSize: '20px' }}>Dimension Scores</h1>
        <DemoRadar />
      </div>
      <div className="rating">
        <Rating ratings={profile.ratings} />
      </div>
    </div>
  </div>
  
  );
};

export default App;
