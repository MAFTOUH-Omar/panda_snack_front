import React, { useState } from 'react'
import Hide from '../../assets/icons/Hide'
import Show from '../../assets/icons/Show'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LineWobble } from '@uiball/loaders'
import { useNavigate } from 'react-router-dom'
import {  Link } from 'react-router-dom'
import Logo from "../../assets/Images/logo.png"

const SignIn = () => {
  const [email , setEmail] = useState()
  const [password , setPassword] = useState()
  const [Err , setErr] = useState()
  const [loading , setLoading] = useState(false)
  const [showPassword , setShowPassword] = useState(false); //Show & hide password
  const togglePasswordVisibilty = () =>{
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate();

  const Login = async () =>{
    try{
      setLoading(true)
      const response = await axios.post(
        'https://panda-snack-back.vercel.app/users/login',
        {
            email: email,
            password: password,
        },{
          headers: {
            'Content-Type' : 'application/json'
          }
        }
      );
      if(response.data.accessToken) {
        Cookies.set('token',response.data.accessToken , { expires: 2 });
        Cookies.set('email',response.data.user.email , { expires: 2 });
        Cookies.set('fullName',response.data.user.fullName , { expires: 2 });
        Cookies.set('Role',response.data.user.role , { expires: 2 });
        Cookies.set('user_id',response.data.user.id , { expires: 2 });
        console.log('success login');
        navigate('/')
        window.location.reload();
      }
    } catch (error) {
      console.log('Error during login:', error);
      setErr("Err");
  } finally {
      setLoading(false);
  }

  } 

  return (
    <div className='flex justify-center items-center h-screen flex-col mt-3 dark:bg-slate-900'>
      {/* Logo */}
      <div className='my-1'>
        <img src={Logo} alt="err" className='mx-auto  hover:rotate-12 transition-all duration-500 w-20' />
      </div>
      {/* Email */}
      <div className='flex flex-col'>
        <label htmlFor="email" className='font-semibold font-mono dark:text-white'>Email</label>
        <input type="text"  className='py-2 px-10 md:px-14 dark:text-white dark:bg-lime-900 border-2 border-lime-500 rounded-lg font-semibold font-mono' value={email} onChange={(f) => setEmail(f.target.value)} placeholder='test@gmail.com' required />
      </div>
        {/* Champ Password */}
      <div className='flex flex-col'>
        <label htmlFor="password" className='font-semibold font-mono dark:text-white'>Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'} // Changez le type en 'text' ou 'password' en fonction de l'état showPassword
            id="password"
            className="py-2 dark:text-white dark:bg-lime-900 px-10 md:px-14 border-2 border-lime-500 rounded-lg font-semibold font-mono"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***********"
            required
          />
          {/* Affichez l'icône pour montrer ou cacher le mot de passe */}
          <span className="absolute top-2 right-2 cursor-pointer" onClick={togglePasswordVisibilty}>
            {showPassword ? <Hide /> : <Show />}
          </span>
        </div>
      </div>
      <div>
        <Link className='font-mono dark:text-white font-thin' to={"/signUp"}>Need an account ?</Link>
      </div>
        {/* Bouton d'inscription */}
      <div className='flex flex-col my-1'>
        <button className='bg-lime-500 hover:bg-lime-400 py-3 px-28 md:px-32 text-white capitalize font-semibold font-mono rounded-lg' onClick={Login} > 
          {
            loading ? <LineWobble size={40} lineWeight={5} speed={1.75} color="white" /> : "login"
          }
        </button>
      </div>
      {
        Err &&
        <div className="bg-red-100 border border-red-400 text-red-700 px-16 md:px-20 mt-1 py-2 rounded-lg relative" role="alert">
          {Err}
        </div>
      }
    </div>
  )
}

export default SignIn