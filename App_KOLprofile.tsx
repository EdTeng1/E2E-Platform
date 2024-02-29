import React from 'react';
import './App.css';
import ProfilePicture from './ProfilePicture';
import ProfileInfo from './ProfileInfo';
import EngagementHistory from './EngagementHistory';
import DemoRadar from './DimensionScore';
import Rating from './Rating';

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
  const profile: Profile = {
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
      { dimension: 'Other Area', rating: 4 },
      { dimension: 'Other Area', rating: 3 },
    ],
  };

  return (
    <div className="app">
      <h1 className="title">KOL Profile</h1>
      <div className="profile">
        <div className="profile-picture">
          <ProfilePicture imageUrl={profile.imageUrl} />
        </div>
        <div className="profile-details">
          <ProfileInfo
            name={profile.name}
            location={profile.location}
            occupation={profile.occupation}
            institution={profile.institution}
            overview={profile.overview}
          />
          <EngagementHistory history={profile.history} />
        </div>
        <div className="dimension-score">
          <DemoRadar scores={profile.scores} />
        </div>
        <div className="rating">
          <Rating ratings={profile.ratings} />
        </div>
      </div>
    </div>
  );
};

export default App;
