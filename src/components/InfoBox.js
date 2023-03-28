import React from 'react';
import Button from '@mui/material/Button';

const InfoBox = ({ info }) => {
  const { label, image1, description, tags, mana_cost, cooldown } = info;
console.log(info, "info")
  return (
    <div className="infoBox ">
        <div className='infoBoxHead'>
        <h1>{label}</h1>
        </div>
        <div className='infoBoxImage'>
        <img src={image1} alt={label} />
        </div>
        <div className='infoBoxTags'>
        {tags.map((tag, i) => (
            <div className='infoBoxTag'>
            {tag}
            </div>
        ))}
        </div>
        <div className='infoBoxDescription'>
      <p>{description}</p>
        </div>
        <div className='infoBoxFooter'>
      <p>
        {mana_cost}
      </p>
      {cooldown && (
        <p>
          {cooldown}
        </p>
      )}
      </div>
    </div>
  );
};

export default InfoBox;