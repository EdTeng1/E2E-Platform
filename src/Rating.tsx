import React from 'react';
import { Progress } from 'antd';

// Step 1: Define an interface for the component's props
interface RatingProps {
  ratings: {
    dimension: string;
    rating: number;
  }[];
}

// Step 2: Apply the interface to the component
const Rating: React.FC<RatingProps> = ({ ratings }) => {
  return (
    <div>
      <h3>Rating</h3>
      {ratings.map((rating, index) => (
        <div key={index}>
          <p>{rating.dimension}</p>
          <Progress percent={(rating.rating / 5) * 100} format={(percent) => `${percent} `} status="success" />
        </div>
      ))}
    </div>
  );
};

export default Rating;
