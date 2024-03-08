// App.tsx
import React, { useState } from 'react';
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
  // name: string;
  title: string;
  first_name: string;
  last_name: string;
  state: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  imageUrl: string;
  location: string;
  institution: string;
  // overview: string;
  history: string[];
  scores: Score[];
  ratings: Rating[];
}

const App: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    imageUrl: 'https://pic1.zhimg.com/80/v2-5267ed226b0e31ea05cbb7b53eaab494_1440w.webp',

    first_name: 'John',
    last_name: 'Doe',
    // location: 'New Jersey, USA',
    city: 'Seattle',
    state: 'WA,
    zip: '98105',
    title: 'Patient Advocacy',
    institution: 'University of Washington',
    phone: '206-111-2345',
    email: 'email123@hotmail.com',
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
