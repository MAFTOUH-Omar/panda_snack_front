import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes , Link } from 'react-router-dom';
import NotFounds from '../errors/NotFounds'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import Light from "../../assets/icons/Light"
import Dark from "../../assets/icons/Dark"
import { AuthContext } from '../../context/AuthContext';
import Orders from '../Orders/Orders';
import Slider from '../Slider/Slider';
import Logo from "../../assets/Images/logo.png"
import OrderIcon from '../../assets/icons/OrderIcon';
import AllOrders from '../Orders/AllOrders';
const Nav = () => {
    const [changeHeader , setChangeHeader] = useState(false);
    const onChangeHeader = () =>{
        if(window.scrollY >= 50){
            setChangeHeader(true)
        }else setChangeHeader(false)
    }
    window.addEventListener('scroll' , onChangeHeader);

    const {token , Logout , toggleDarkMode , darkMode } = useContext(AuthContext)

  return (
    <div>
        <Router>
            <header className={changeHeader ? "bg-white dark:bg-slate-900 fixed z-50 top-0 left-0 w-full shadow-md transition duration-500" : "md:bg-transparent bg-white dark:bg-slate-900 fixed z-50 top-0 left-0 w-full transition duration-500"}>
                <nav className='flex items-center mx-auto'>
                    {/* Logo left side */}
                    <Link className='flex justify-start items-center' to={"/"}>
                        <img src={Logo} alt="err" className='cursor-pointer w-16 py-1 px-1 md:ml-2 items-center'/>
                        <span className='hidden md:block font-semibold dark:text-white'>
                            &nbsp;Panda snack
                        </span>
                    </Link>
                    {/* Right Side */}
                    <div className='flex items-center absolute md:right-8 right-4'>
                        {/* Toggle theme from dark to light */}
                        {
                            token && <OrderIcon/>
                        }

                        <div className='flex items-center mr-6'>
                            <button onClick={toggleDarkMode}>
                                {darkMode !== "dark" ? <Dark/> : <Light/>}
                            </button>
                        </div>


                        {
                            token ? 
                            <button className='bg-lime-500 rounded-xl py-3 px-6 mx-2 text-white poppins hover:bg-lime-400 hover:scale-105 transition-all duration-500 font-semibold' onClick={Logout}>
                                Logout
                            </button> 
                            : 
                            <>
                                <Link className='poppins font-semibold mr-3 dark:text-white' to={"/signIn"}>
                                    Sign In
                                </Link>
                                <Link className='bg-lime-500 rounded-xl py-3 px-6 mx-2 text-white poppins hover:bg-lime-400 hover:scale-105 transition-all duration-500 font-semibold' to={"/signUp"}>
                                    Sign Up
                                </Link>
                            </>
                        }
                    </div>
                </nav>
            </header>
            <Routes>
                <Route path='/signIn' element={<SignIn/>} />
                <Route path='/signUp' element={<SignUp/>} />
                <Route path='/' element={<Slider/>} />
                <Route path="*" element={<NotFounds/>} />
                <Route path="/order/:id" element={token ? <Orders/> : <SignIn/>} />
                <Route path="/allorders" element={token ? <AllOrders/> : <SignIn/>} />
            </Routes>
        </Router>
    </div>
  )
}
export { Nav };