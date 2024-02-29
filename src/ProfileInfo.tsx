import React from 'react';
import { Descriptions } from 'antd';

// Step 1: Define an interface for the component's props
interface ProfileInfoProps {
  name: string;
  location: string;
  occupation: string;
  institution: string;
  overview: string;
}

// Step 2: Apply the interface to the component
const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, location, occupation, institution, overview }) => {
  return (
    <div style={{ marginBottom: 20 }}>
        <h3> Profile Information</h3>
      <Descriptions bordered>
        <Descriptions.Item label="Name" span={2}>{name}</Descriptions.Item>
        <Descriptions.Item label="Location" span={2}>{location}</Descriptions.Item>
        <Descriptions.Item label="Occupation" span={2}>{occupation}</Descriptions.Item>
        <Descriptions.Item label="Institution" span={2}>{institution}</Descriptions.Item>
        <Descriptions.Item label="Overview" span={3}>{overview}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProfileInfo;
