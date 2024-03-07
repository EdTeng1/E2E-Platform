// Code for the EditableText component
//讓使用者可以編輯文字的元件

import React, { useState } from 'react';

interface EditableTextProps {
  text: string;
  onTextChange: (newText: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({ text, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(editableText);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(event.target.value);
  };

  return isEditing ? (
    <textarea
      value={editableText}
      onChange={handleChange}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <span onDoubleClick={handleDoubleClick}>{text}</span>
  );
};

export default EditableText;
