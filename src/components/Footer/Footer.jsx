import React from 'react'
import Logo from '../../assets/Images/logo.png'

const Footer = () => {
  return (
    <div className='h-8 md:h-8 p-4 lg:p-20 xl:p-10 text-black flex items-center justify-between dark:text-white dark:bg-slate-900'>
        <div className='flex'>
            <img src={Logo} alt="" className='w-[50px] inline-flex cursor-pointer' />
        </div>
    <p>
        &copy; {new Date().getFullYear()} MAFTOUH Omar. All Rights Reserved.
    </p>
    </div>
  )
}

export default Footer