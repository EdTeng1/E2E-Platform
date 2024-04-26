import React from 'react';
import { Timeline } from 'antd';

interface Engagement {
  engagementA: string;
  functionA?: string;
  notes?: string;
  followUpRequested?: string;
  functionB?: string;
  informationRequested?: string;
}

interface EngagementHistoryProps {
  history: Engagement[];
}

const EngagementHistory: React.FC<EngagementHistoryProps> = ({ history }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Engagement History</h3>
      <Timeline>
        {history.map((engagement, index) => (
          <Timeline.Item key={index}>
            <div style={{ padding: '10px', border: '1px solid #e8e8e8', borderRadius: '5px' }}>
              <p><b>Engagement A:</b> {engagement.engagementA}</p>
              {engagement.functionA && <p><b>Function A:</b> {engagement.functionA}</p>}
              {engagement.notes && <p><b>Notes:</b> {engagement.notes}</p>}
              {engagement.followUpRequested && <p><b>Follow Up Requested:</b> {engagement.followUpRequested}</p>}
              {engagement.functionB && <p><b>Function B:</b> {engagement.functionB}</p>}
              {engagement.informationRequested && <p><b>Information Requested:</b> {engagement.informationRequested}</p>}
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default EngagementHistory;
