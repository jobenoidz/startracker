import React from 'react';
import './Card.css';

const Card = ({ data }) => {
  const { Name, Start, Progress, End, Unit } = data;

  function getProgress(exp) {
    var curr_exp = (exp % 12.5 / 12.5) * 100;
    return curr_exp.toFixed(0); // Multiply by 100 to get percentage
  }

  const progressPercent = getProgress(Progress);

  return (
    <tr className="card">
      <div className='column'>
        {Name}
      </div>
      <div className='exp'>
        <div className='threshold'>
          {Start}
        </div>
        <div className='bar'>
          <div
            className='bar-bg'
            style={{ clipPath: `inset(0 ${100 - progressPercent}% 0 0)` }}
          ></div>
          {progressPercent >= 30 ? (
            <div
              className='text-inside'
              style={{ left: `calc(${progressPercent}% - 8px)` }}
            >
              {`${progressPercent}%`}
            </div>
          ) : (
            <div
              className='text-outside'
              style={{ left: `${progressPercent}%` }}
            >
              {`${progressPercent}%`}
            </div>
          )}
        </div>
        <div className='threshold'>
          {End}
        </div>
      </div>
      <div className='column'>
        {Unit}
      </div>
    </tr>
  );
};

export default Card;
