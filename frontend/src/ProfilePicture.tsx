import React from 'react';

// Step 1: Define an interface for the component's props
interface ProfilePictureProps {
  imageUrl: string;
}

// Step 2: Apply the interface to the component
const ProfilePicture: React.FC<ProfilePictureProps> = ({ imageUrl }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <img src={imageUrl} alt="Profile" style={{ borderRadius: '50%', width: 150, height: 150 }} />
    </div>
  );
};

export default ProfilePicture;
