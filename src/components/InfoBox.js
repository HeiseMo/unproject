import React from 'react';

const InfoBox = ({ info }) => {
  const { label, image1, description, tags, mana_cost, cooldown } = info;
console.log(info, "info")
  return (
    <div className="infoBox ">
      <h1>{label}</h1>
      <img src={image1} alt={label} />
      <p>{description}</p>
      <h3>Tags:</h3>
      <div className="tagList">
        {tags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
      <p>
        <strong>Mana Cost:</strong> {mana_cost}
      </p>
      {cooldown && (
        <p>
          <strong>Cooldown:</strong> {cooldown}
        </p>
      )}
    </div>
  );
};

export default InfoBox;