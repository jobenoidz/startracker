import React from 'react';
import './Card.css';

import yellow from './yellow.gif';
import green from './green.gif';
import purple from './purple.gif';
import blue from './blue.gif';
import black from './black.gif';

const Card = ({ data }) => {
  const { Name, Start, Progress, End, Unit, Color } = data;

  function getProgress(exp) {
    var curr_exp = (exp % 12.5 / 12.5) * 100;
    return curr_exp.toFixed(0); // Multiply by 100 to get percentage
  }

  function getColor(color) {
    switch (color) {
      case "yellow":
        return yellow;
      case "green":
        return green;
      case "purple":
        return purple;
      case "blue":
        return blue;
      case "black":
        return black;
      default:
        break;
    }
  }

  const progressPercent = getProgress(Progress);
  const gifColor = getColor(Color)

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
            style={{ clipPath: `inset(0 ${100 - progressPercent}% 0 0)`, backgroundImage: `url(${gifColor})` }}
          ></div>
          {progressPercent >= 30 ? (
            <div
              className='text-inside'
              style={{ left: `calc(${progressPercent}% - 5px)` }}
            >
              {`${Progress}`}
            </div>
          ) : (
            <div
              className='text-outside'
              style={{ left: `${progressPercent}%` }}
            >
              {`${Progress}`}
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
