import React, { useState } from 'react'
import Hide from '../../assets/icons/Hide'
import Show from '../../assets/icons/Show'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LineWobble } from '@uiball/loaders'
import {  Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/Images/logo.png"

const SignUp = () => {
  const [fullName , setFullName] = useState();
  const [email , setEmail] = useState();
  const [phone , setPhone] = useState();
  const [role , setRole] = useState('User');
  const [password , setPassword] = useState();

  const [showPassword , setShowPassword] = useState(false); //Show & hide password
  const togglePasswordVisibilty = () =>{
    setShowPassword(!showPassword)
  }

  const [Err , setErr] = useState()
  const [loading , setLoading] = useState(false)

  const navigate = useNavigate();

const Subscribe = async () => {
  try {
    setLoading(true);
    const formData = new FormData(); // Create a FormData object

    // Append data to the FormData object
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('role', role);
    formData.append('password', password);

    const response = await axios.post('https://panda-snack-back-v2.vercel.app/users/subscribe', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data) {
      Cookies.set('fullName', fullName);
      Cookies.set('phone', phone);
      console.log('subscribe success');
      navigate('/signIn')
    }
  } catch (error) {
    setErr(error.response.data);
  } finally {
    setLoading(false);
  }
};

return (
<div className='flex items-center justify-center md:h-screen flex-col mt-3 dark:bg-slate-900 md:mt-10'>
  {/* Logo */}
  <div className='md:my-1'>
    <img src={Logo} alt="err" className='mx-auto md:mt-0 mt-[90px] hover:rotate-12 transition-all duration-500 w-20' />
  </div>
  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {/* Champ Full Name */}
    <div className='flex flex-col mt-1 md:mt-0'>
      <label htmlFor="fullName" className='font-semibold font-mono dark:text-white'>Full Name</label>
      <input type="text" id="fullName" className='dark:bg-lime-900 dark:text-white py-2 px-14 md:px-14 border-2 border-lime-500 rounded-lg font-semibold font-mono' value={fullName} onChange={(f) => setFullName(f.target.value)} placeholder='Full Name' required />
    </div>
    {/* Champ Email */}
    <div className='flex flex-col mt-1 md:mt-0'>
      <label htmlFor="email" className='font-semibold font-mono dark:text-white'>Email</label>
      <input type="text" id="email" className='dark:bg-lime-900 dark:text-white py-2 px-4 md:px-14 border-2 border-lime-500 rounded-lg font-semibold font-mono' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='test@gmail.ma' required />
    </div>
    {/* Champ Phone */}
    <div className='flex flex-col mt-1 md:mt-0'>
      <label htmlFor="phone" className='font-semibold font-mono dark:text-white'>Phone</label>
      <input type="text" id="phone" className='dark:bg-lime-900 py-2 px-4 md:px-14 border-2 border-lime-500 rounded-lg font-semibold font-mono dark:text-white' value={phone} onChange={(p) => setPhone(p.target.value)} placeholder='+212 600 000 000' required />
    </div>
    {/* Champ Role */}
    <div className='flex flex-col mt-1 md:mt-0'>
      <label htmlFor="role" className='font-semibold font-mono dark:text-white'>Role</label>
      <select value={role} onChange={(r) => setRole(r.target.value)} className='dark:bg-lime-900 py-2 px-4 md:px-24 border-2 border-lime-500 rounded-lg font-semibold font-mono dark:text-white'>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Delivery">Delivery</option>
      </select>
    </div>
  </div>
  {/* Champ Password */}
  <div className='flex flex-col mt-1 md:mt-0'>
    <label htmlFor="password" className='font-semibold font-mono dark:text-white'>Password</label>
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        className="dark:bg-lime-900 dark:text-white py-2 px-14 md:px-14 border-2 border-lime-500 rounded-lg font-semibold font-mono"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="***********"
        required
      />
      {/* Affichez l'icône pour montrer ou cacher le mot de passe */}
      <span className="absolute top-2 right-2 cursor-pointer" onClick={togglePasswordVisibilty}>
        {showPassword ? <Hide/> : <Show />}
      </span>
    </div>
  </div>

  {/* have accounct */}
  <div className='mt-1 md:mt-0'>
    <Link className='font-mono font-thin dark:text-white ' to={"/signIn"}>Already have an account ?</Link>
  </div>

  {/* Bouton d'inscription */}
  <div className='flex flex-col mt-2 md:mt-1 md:mb-0 mb-10'>
    <button className='bg-lime-500 hover:bg-lime-400 py-3 px-[111px] md:px-28 text-white capitalize font-semibold font-mono rounded-lg' onClick={Subscribe} > 
      {
        loading ? <LineWobble size={40} lineWeight={5} speed={1.75} color="white" /> : "subscribe"
      }
    </button>
  </div>
  {
        Err &&
        <div className="bg-red-100 border border-red-400 text-red-700  md:px-10 mt-1 py-2 rounded-lg relative" role="alert">
          {Err}
        </div>
      }
</div>

  )
}

export default SignUp