import React from 'react';

const Tags = ({ tags }) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => (
        <li key={tag} className="tag-default tag pill tag-out">{tag}</li>
      ))}
    </ul>
  );
};

export default Tags;

