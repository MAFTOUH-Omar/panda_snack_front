import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Trash from "../../assets/icons/Trash"
const AllOrders = () => {
  const [allOrders , setAllOrders] = useState(null);

  const {user_id} = useContext(AuthContext)

  const [loading , setLoading ] = useState(false)

  useEffect(()=>{
    axios.get(`https://panda-snack-back-v2.vercel.app/orders/showOrdersByuserId/${user_id}`).then((res) => {
        setInterval(()=>{
          setAllOrders(res.data.orders)
        });
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  },[])

  const Delete = async (idOrder) =>{
    try{
      setLoading(true)
      const response = await axios.delete(`https://panda-snack-back-v2.vercel.app/orders/orders/${idOrder}`)
      if(response){
        window.location.reload();
      }
    }catch (error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='flex dark:bg-slate-900 justify-center md:px-20'>
        <div className='flex h-screen justify-center mt-20 md:mt-20 mb-4  md:w-1/2 flex-col flex-1'>
            {
              allOrders && allOrders.map((order)=>(
                <div className="flex items-center justify-between md:flex-row flex-col mb-4" key={order._id}>
                    <img src={`https://panda-snack-back-v2.vercel.app/meal_picture/${order.meal.Mealpicture}`} alt="Err"  className="md:w-[150px] w-[150px] hover:rotate-12 duration-500 transition-all"  />
                    <h1 className="font-mono font-semibold my-1text-lg dark:text-white">{order.meal.name}</h1>
                    <h1 className="font-mono font-semibold md:my-0 my-1 text-lg dark:text-white">{order.quantity} * {order.meal.price} = <span className='dark:text-lime-500 text-lime-700'>{order.totalPrice} DHs</span></h1>
                    <div className='flex flex-col'>
                      <h1 className={`font-semibold font-mono md:my-0 my-1 dark:text-white`}>Status :&nbsp;
                        <span 
                          className={
                            `${order.status == 'processing' && 'text-slate-900 bg-amber-400 px-2 rounded-xl'}
                              ${order.status == 'shipped' && 'text-slate-100 bg-green-700 px-2 rounded-xl'}
                              ${order.status == 'delivered' && 'text-slate-900 bg-lime-400 px-2 rounded-xl'}`
                            
                            }>{order.status}
                        </span>
                      </h1>
                    </div>
                    <button className='bg-red-500 px-[50px] py-2 md:py-1 md:px-1 rounded-md' onClick={()=>{Delete(order._id)}}>
                      <Trash/>
                    </button>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default AllOrders