// App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ProfilePicture from './ProfilePicture';
import ProfileInfo from './ProfileInfo';
import EngagementHistory from './EngagementHistory';
import DemoRadar from './DimensionScore';
import Rating from './Rating';
import EditableText from './EditableText';
import { postData } from './service/http';

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
    // Initialize with empty or placeholder values
    imageUrl: '',
    name: '',
    location: '',
    occupation: '',
    institution: '',
    overview: '',
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
          imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg&_gl=1*13kff3c*_ga*MTcyODI3MDk5My4xNzEyNzQxODk0*_ga_8JE65Q40S6*MTcxMjc0MTg5My4xLjEuMTcxMjc0MTg5OC4wLjAuMA..', // Placeholder value for now
          name: `${profileData.firstName} ${profileData.lastName}`, // Example of combining two fields
          location: `${profileData.city} ${profileData.state}`, // Providing default values if needed
          occupation: 'placeholder', // Placeholder value for now
          institution: profileData.institute,
          overview: 'placeholder', // Placeholder value for now
          history: [],
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
            {/* {profile.history.map((item, index) => (
              <div key={index} className="editable-field">
                <EditableText
                  text={item}
                  onTextChange={(newText) => handleHistoryChange(index, newText)}
                />
              </div>
            ))} */}
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
          {/* <Rating ratings={profile.ratings} /> */}
        </div>
      </div>
    </div>

  );
};

export default App;
