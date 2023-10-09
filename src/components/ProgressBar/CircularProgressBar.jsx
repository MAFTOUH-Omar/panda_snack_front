import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularProgressBar = () => {
  const [SatisfiedCustomer, setSatisfiedCustomer] = useState(0);
  const [HealthyMeals, setHealthyMeals] = useState(0);
  const [ReasonablePrices, setReasonablePrices] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (SatisfiedCustomer < 87) {
        setSatisfiedCustomer(SatisfiedCustomer + 10);
      } else if(HealthyMeals < 55){
        setHealthyMeals(HealthyMeals + 10);
      }else if(ReasonablePrices < 90){
        setReasonablePrices(ReasonablePrices + 10);
      }else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [SatisfiedCustomer ,HealthyMeals , ReasonablePrices]);
  return (
    <div className="flex">
      <div className='md:w-[170px] md:mx-24 mx-3 hover:scale-105 transition-all duration-500'>
      <CircularProgressbar
        value={SatisfiedCustomer}
        text={`${SatisfiedCustomer}%`}
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
      <h1 className='dark:text-lime-300 mt-2 capitalize font-semibold text-lg text-center text-lime-700'>satisfied customer</h1>
      </div>
      <div className='md:w-[170px] md:mx-24 mx-3 hover:scale-105 transition-all duration-500 '>
      <CircularProgressbar
        value={HealthyMeals}
        text={`${HealthyMeals}%`}
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
      <h1 className='dark:text-lime-300 mt-2 font-semibold text-lg capitalize text-center text-lime-700'>healthy meals</h1>
      </div>
      <div className='md:w-[170px] md:mx-24 mx-3 hover:scale-105 transition-all duration-500'>
      <CircularProgressbar
        value={ReasonablePrices}
        text={`${ReasonablePrices}%`}
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
      <h1 className='dark:text-lime-300 mt-2 font-semibold text-lg capitalize text-center text-lime-700'>Reasonable prices</h1>
      </div>
    </div>
  );
};

export default CircularProgressBar;
