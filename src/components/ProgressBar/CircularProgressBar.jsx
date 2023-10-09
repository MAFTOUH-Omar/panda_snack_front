import React from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularProgressBar = ({ percentage }) => {
  return (
    <div className="flex">
      <div className='md:w-[170px] mx-3'>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        className="text-2xl text-white dark:text-white font-mono"
        styles={buildStyles({
          pathTransitionDuration: 1,
          pathColor: `#84cc16`,
          textColor: '#65a30d', 
          trailColor: '#d9f99d', 
          'backgroundColor': '#86efac',
        })}
      />
      <h1 className='dark:text-lime-300 font-semibold text-xl text-center text-lime-700'>User</h1>
      </div>
      <div className='md:w-[170px] mx-3'>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        className="text-2xl text-white dark:text-white font-mono"
        styles={buildStyles({
          pathTransitionDuration: 1,
          pathColor: `#84cc16`,
          textColor: '#65a30d', 
          trailColor: '#d9f99d', 
          'backgroundColor': '#86efac',
        })}
      />
      <h1 className='dark:text-lime-300 font-semibold text-xl text-center text-lime-700'>User</h1>
      </div>
      <div className='md:w-[170px] mx-3'>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        className="text-2xl text-white dark:text-white font-mono"
        styles={buildStyles({
          pathTransitionDuration: 1,
          pathColor: `#84cc16`,
          textColor: '#65a30d', 
          trailColor: '#d9f99d', 
          'backgroundColor': '#86efac',
        })}
      />
      <h1 className='dark:text-lime-300 font-semibold text-xl text-center text-lime-700'>User</h1>
      </div>
    </div>
  );
};

export default CircularProgressBar;
