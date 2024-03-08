import React from 'react';
import { Descriptions } from 'antd';

// Step 1: Define an interface for the component's props
interface ProfileInfoProps {
  title?: string;
  first_name?: string;
  last_name: string;
  state?: string;
  city: string;
  zip: string;
  phone?: string;
  email: string;
  occupation?: string;
  institution: string;
  overview?: string;
}

// Step 2: Apply the interface to the component
const ProfileInfo: React.FC<ProfileInfoProps> = ({ first_name, last_name, city, state, zip, title, institution, phone, email }) => {
  return (
    <div style={{ marginBottom: 20 }}>
        <h3> Profile Information</h3>
      <Descriptions bordered>
        <Descriptions.Item label="Name" span={2}>{first_name} {last_name}</Descriptions.Item>
        <Descriptions.Item label="Title" span={2}>{title}</Descriptions.Item>
        <Descriptions.Item label="Location" span={2}>{city}, {state}, {zip}</Descriptions.Item>
        <Descriptions.Item label="Institution" span={2}>{institution}</Descriptions.Item>
        <Descriptions.Item label="Overview" span={3}>{phone}</Descriptions.Item>
        <Descriptions.Item label="Overview" span={3}>{email}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProfileInfo;
