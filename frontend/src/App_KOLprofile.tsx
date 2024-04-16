// App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const query = useQuery();
  const name = query.get('name');

  useEffect(() => {
    if (name) {
      axios.get<Profile>(`http://localhost:3001/getProfile?name=${encodeURIComponent(name)}`)
        .then(response => {
          setProfile(response.data);
        })
        .catch(error => {
          console.error('Failed to fetch profile', error);
        });
    }
  }, [name]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const handleProfileChange = (field: keyof Profile, value: string | string[]) => {
    setProfile((prevProfile) => {
      // 如果 prevProfile 是 null，我们不能直接更新它
      if (prevProfile === null) {
        // 根据实际情况处理，这里是一个示例
        // 可能需要根据你的应用逻辑返回一个有效的 Profile 对象
        return null; // 或者返回一个具有默认值的 Profile 对象
      }
      // 如果 prevProfile 不是 null，更新特定字段
      return {
        ...prevProfile,
        [field]: value,
      };
    });
  };

  const handleHistoryChange = (index: number, newText: string) => {
    setProfile(prevProfile => {
      // 如果 prevProfile 是 null，则不进行任何操作
      if (prevProfile === null) {
        return null;
      }
  
      // 由于 prevProfile 确定非 null，这里可以放心地更新 history
      const updatedHistory = [...prevProfile.history];
      updatedHistory[index] = newText;
  
      // 返回更新后的 profile，这里不会有任何属性是 undefined
      // 因为我们是基于 prevProfile 的现有值进行更新
      return {
        ...prevProfile,
        history: updatedHistory,
      };
    });
  };
  

  const saveProfile = async () => {
    if (!profile) return; // Ensure profile is not null
    try {
      const response = await axios.post('http://localhost:3001/updateProfile', profile);
      console.log('Profile saved successfully', response.data);
      // 处理成功的反馈
    } catch (error) {
      console.error('Failed to save profile', error);
      // 处理失败的反馈
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
