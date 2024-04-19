// EditableOverview.tsx

import React, { useState } from 'react';

interface EditableOverviewProps {
  overview: string;
  onUpdate: (newOverview: string) => void;
}

const EditableOverview: React.FC<EditableOverviewProps> = ({ overview, onUpdate }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState(overview);

  const toggleEdit = () => setIsEditable(!isEditable);

  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    setContent(event.currentTarget.textContent || '');
  };

  const handleBlur = () => {
    toggleEdit();
    onUpdate(content);
  };

  return (
    <div>
      <div
        contentEditable={isEditable}
        onInput={handleChange}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
        style={{ border: isEditable ? '1px solid blue' : 'none', padding: '10px', cursor: 'text' }}
      >
        {content}
      </div>
      <button onClick={toggleEdit}>{isEditable ? '保存' : '編輯'}</button>
    </div>
  );
};

export {};
