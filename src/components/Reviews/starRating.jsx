import React, { useState } from 'react';
import './starRating.css';

const StarRating = ({ rating, onChange }) => {
  const [selectedStars, setSelectedStars] = useState(rating);

  const toggleStar = (starNumber) => {
    setSelectedStars(starNumber);
    onChange(starNumber);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= selectedStars ? 'selected' : ''}`}
          onClick={() => toggleStar(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
