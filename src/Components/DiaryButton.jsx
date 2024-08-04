import React from 'react';
import "./DiaryButton.css"

const DiaryButton = ({children }) => {

  return (
    <button className='btn' type="submit">
        
      {children}
    </button>
  );
};

export default DiaryButton;
