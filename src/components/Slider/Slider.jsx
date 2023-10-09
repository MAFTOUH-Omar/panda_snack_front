import React, { useEffect, useState } from 'react'
import Category from '../Category/Category'
import Annonce from "../../assets/icons/Annonce"
import Enter from "../../assets/icons/Enter"
import { useNavigate } from 'react-router-dom'
import CircularProgressBar from '../ProgressBar/CircularProgressBar'
const Slider = () => {
  const navigate = useNavigate()
  //Progress Bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 20) {
        setProgress(progress + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [progress]);
  //End
  return (
    <main className='flex justify-center items-center pt-[120px] dark:bg-slate-900 flex-col'> 
      <div className='flex justify-start items-center md:w-[350px] rounded-lg bg-lime-300 h-[40px] md:mb-8 hover:scale-105 transition-all duration-500' onClick={()=>{navigate('/signIn')}}>
        {/* Annonce icon */}
        <span className='bg-lime-700 rounded-lg px-2 py-1 ml-2'>
            <Annonce/>
        </span>
        <div className="">
            <p className='font-semibold capitalize ml-4 font-mono'>order your meals now 🤗</p>
        </div>
        {/* Enter Icon */}
        <span className='hover:translate-x-6 transition-all duration-500'>
          <Enter/>
        </span>
      </div>
      <div className='flex justify-center items-center my-5'>
        <h1 className='md:text-2xl text-md text-center font-semibold font-mono dark:text-white hover:scale-90 duration-500 transition-all'>Delicious cuisine eagerly anticipating your taste buds.</h1>
      </div>
      <div className='mt-5'>
        <Category />
      </div>
      {/* Progress Bar */}
      <div className="my-5">
        <CircularProgressBar percentage={progress} />
      </div>
    </main>
  )
}

export default Slider