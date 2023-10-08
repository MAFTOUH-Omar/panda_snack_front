import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const OrderIcon = () => {
  const { user_id } = useContext(AuthContext);
  const [orderCount, setOrderCount] = useState(null);

  const fetchOrderCount = async () => {
    try {
      const response = await axios.get(`https://panda-snack-server.vercel.app/orders/countOrdersByUserId/${user_id}`);
      setOrderCount(response.data.orderCount);
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  useEffect(() => {
    fetchOrderCount();
    const pollingInterval = setInterval(() => {
      fetchOrderCount();
    }, 100);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [user_id]);

  const navigate = useNavigate();

  return (
      <span className="flex items-center cursor-pointer" onClick={() => { navigate('/allorders') }}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
          </svg>
          <span className="mb-4 mr-2 bg-lime-500 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              {orderCount !== null && (
                  <p>{orderCount}</p>
              )}
          </span>
      </span>
  );
}

export default OrderIcon;