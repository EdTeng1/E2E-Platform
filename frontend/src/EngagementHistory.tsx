import React from 'react';
import { Timeline } from 'antd';

// Define an interface for the component's props
interface EngagementHistoryProps {
  history: string[];
}

const EngagementHistory: React.FC<EngagementHistoryProps> = ({ history }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Engagement History</h3>
      <Timeline>
        {history.map((event, index) => (
          <Timeline.Item key={index}>{event}</Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default EngagementHistory;
