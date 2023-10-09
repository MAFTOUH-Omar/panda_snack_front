import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Heart from "../../assets/icons/Heart"
import Cart from "../../assets/icons/Cart"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const Orders = () => {
    const {id} = useParams()

    const [meal , setMeal] = useState(null)

    const [loading , setLoading] = useState(false)

    const {fullName , email , user_id} = useContext(AuthContext)

    const [name , setName] = useState(fullName)
    const [Orderemail , setOrderEmail] = useState(email)
    const [phone , setPhone] = useState()
    const [address , setAddress] = useState()

    const [quantity , setQuantity] = useState(1)
    const [totalPrice , setTotalPrice] = useState(0)

    const navigate = useNavigate()

    const AddToCart = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          'https://panda-snack-back-v2.vercel.app/orders/orders',
          {
            name: name,
            email: Orderemail,
            phone: phone,
            adress: address, 
            meal: id,
            quantity: quantity,
            totalPrice: totalPrice,
            userId : user_id
          }
        );
        if (response.status === 201) {
          navigate('/allorders');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };    

    useEffect(() => {
        axios
          .get(`https://panda-snack-back-v2.vercel.app/meals/meals/${id}`)
          .then((res) => {
            setMeal(res.data);
            setTotalPrice(res.data.price * quantity);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
    }, [id, quantity]);

      const Riting = (riting) => {
        switch (riting) {
          case 5:
            return (
              <>
                <Heart />
                <Heart />
                <Heart />
                <Heart />
                <Heart />
              </>
            );
          case 4:
            return (
              <>
                <Heart />
                <Heart />
                <Heart />
                <Heart />
              </>
            );
          case 3:
            return (
              <>
                <Heart />
                <Heart />
                <Heart />
              </>
            );
          case 2:
            return (
              <>
                <Heart />
                <Heart />
              </>
            );
          case 1:
            return (
              <>
                <Heart />
                <Heart />
              </>
            );
          default:
            return null; // Return null for unknown ratings
        }
      };      
    return (
        <div className='flex justify-center items-center h-screen dark:bg-slate-900 md:px-20 flex-col md:flex-row'>
            <div className='md:w-1/2 flex flex-col'>
                {meal && (
                    <div className='mt-[500px] md:mt-0'>
                        <img
                        src={`https://panda-snack-back-v2.vercel.app/meal_picture/${meal.Mealpicture}`}
                        alt='Meal Image'
                        className='md:w-[400px] w-[300px] hover:scale-105 transition-all duration-500'
                        />
                    </div>
                )}
            </div>
            <div className='md:w-1/2 md:mt-20 flex flex-col container md:mx-auto max-w-screen-lg dark:bg-slate-900'>
                    {
                        meal && (
                            <div className=''>
                                <h1 className='text-black dark:text-white font-mono font-extrabold text-xl text-center md:text-3xl md:text-start'>{meal.name}</h1>
                                <h1 className='text-black dark:text-slate-300 font-mono font-extrabold md:text-xl md:text-start text-center text-md'>{meal.description}</h1>
                                <li className='text-black dark:text-slate-300 font-mono font-extrabold md:text-md my-2 md:mt-3 ml-10'>Category : <span className='bg-lime-400 py-1 rounded-xl px-2 text-black'>{meal.categoryId.name}</span></li>
                                <li className='text-black dark:text-slate-300 font-mono font-extrabold md:text-md mt-3 ml-10'>Tags : <span className='bg-lime-400 py-1 rounded-xl px-1 md:px-2 text-black '>#{meal.tags}</span></li>
                                <li className='text-black dark:text-slate-300 font-mono font-extrabold md:text-md my-2 ml-[150px] md:mt-4 md:ml-10 inline-flex'>
                                    {Riting(meal.riting)}
                                    <h1 className='font-extrabold text-xl dark:text-slate-300'>&nbsp;/5</h1>
                                </li>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='md:w-1/2 flex flex-col mx-3 md:mx-1'>
                                        <label className='dark:text-white font-mono font-semibold'>Email</label>
                                        <input type="text" className='dark:bg-lime-900  rounded-lg py-1 dark:text-white px-10 text-center border-2 border-lime-700' value={Orderemail} onChange={(e)=>{setOrderEmail(e.target.value)}}placeholder='Email'  />
                                    </div>
                                    <div className='md:w-1/2 flex flex-col mx-3 md:mx-1'>
                                        <label className='dark:text-white font-mono font-semibold'>Name</label>
                                        <input type="text" className='dark:bg-lime-900 rounded-lg py-1 dark:text-white px-10 text-center border-2 border-lime-700' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name' />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='md:w-1/2 flex flex-col mx-3 md:mx-1'>
                                        <label className='dark:text-white font-mono font-semibold'>Phone</label>
                                        <input type="text" className='dark:bg-lime-900 rounded-lg py-1 dark:text-white px-10 text-center border-2 border-lime-700' value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder='phone' />
                                    </div>
                                    <div className='md:w-1/2 flex flex-col mx-3 md:mx-1'>
                                        <label className='dark:text-white font-mono font-semibold'>Address</label>
                                        <input type="text" className='dark:bg-lime-900 rounded-lg py-1 dark:text-white px-10 text-center border-2 border-lime-700' value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder='Adress' />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='md:w-1/2 flex flex-col mx-3 md:mx-1'>
                                        <label className='dark:text-white font-mono font-semibold'>Quatity</label>
                                        <input type="text" className='dark:bg-lime-900 rounded-lg py-1 dark:text-white px-10 text-center border-2 border-lime-700' value={quantity} readOnly placeholder='phone' />
                                    </div>
                                    <div className='md:w-1/2 flex flex-col mx-3 md:mx-1'>
                                        <label className='dark:text-white font-mono font-semibold'>Total Price</label>
                                        <input type="text" className='dark:bg-lime-900 rounded-lg py-1 dark:text-white px-10 text-center border-2 border-lime-700' value={`${totalPrice} DHs`} readOnly placeholder='Total Price' />
                                    </div>
                                </div>
                                {/* Price */}
                                <div className="flex justify-center items-center md:flex-row flex-col">
                                    <div className='md:w-1/2 flex flex-col mx-3'>
                                        <h1 className=' dark:text-lime-300 text-lime-700 font-extrabold md:text-4xl text-3xl mt-2 md:mt-4'>{meal.price*quantity}.00 DHs</h1>
                                    </div>
                                    <div className='md:w-1/2 md:mt-5 mt-2'>
                                        <span className=''>
                                            <button className='dark:bg-lime-500 bg-black rounded-xl px-2 text-md text-white ' onClick={()=>{setQuantity(quantity+1)}} disabled={quantity>=10 ? 1 : 0}>
                                                +
                                            </button>
                                                <span className='dark:text-white text-xl font-medium mx-5 text-black'>{quantity}</span>
                                            <button className='dark:bg-lime-500 rounded-xl px-2 text-md text-white bg-black' onClick={()=>{setQuantity(quantity-1)}} disabled={quantity<=1 ? 1 : 0}>
                                                -
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                {/* Order */}
                                <div className='flex items-center flex-col justify-start mx-auto mt-4 md:ml-[300px] mb-10'>
                                    <button className='bg-lime-500 inline-flex py-3 px-28 md:px-20 flex-1 hover:scale-105 transition-all duration-500 rounded-md font-mono font-semibold text-md' onClick={AddToCart} >
                                        Add to cart&nbsp;<span><Cart /></span>
                                    </button>
                                </div>
                            </div>
                        )
                    }
          </div>
        </div>
    );
      
}

export default Orders