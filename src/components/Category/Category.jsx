import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Category = () => {
  const [categories, setCategories] = useState(null);
  const [mealsByCat, setMealsByCat] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  useEffect(() => {
    axios
      .get('https://panda-snack-back-v2.vercel.app/categorys/categories')
      .then((res) => {
        setCategories(res.data);
        if (res.data.length > 0) {
            setSelectedCategory(res.data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`https://panda-snack-back-v2.vercel.app/meals/mealsbycat/${selectedCategory._id}`)
        .then((res) => {
          setMealsByCat(res.data.meals);
        })
        .catch((error) => {
          console.error('Error fetching meals:', error);
        });
    }
  }, [selectedCategory]);

  const navigate = useNavigate()

  return (
    <div className='flex flex-wrap mt-8 dark:bg-slate-900'>
    {/* Catégories */}
    <div className='flex flex-wrap md:flex-nowrap mx-auto' >
        {categories &&
            categories.map((item) => (
            <div
                className="md:w-1/6 w-1/3 my-3 text-center md:my-0 md:mx-3 cursor-pointer"
                key={item._id}
                onClick={() => {
                setSelectedCategory(item);
                }}
            >
                <span
                className={`bg-lime-500 py-3 md:px-5 px-6 capitalize font-mono hover:bg-lime-400 rounded-lg transition-all duration-500 text-white ${
                    selectedCategory && selectedCategory._id === item._id ? 'bg-lime-700' : ''
                }`}
                >
                    {item.name}
                </span>
            </div>
        ))}
    </div>
    {/* Repas */}
    <div className='flex flex-wrap items-center justify-center mt-10 flex-grow my-10'>
        {mealsByCat &&
        mealsByCat.map((item) => (
            <div key={item._id}  className='md:w-1/3 dark:bg-lime-900 my-1 py-1 px-2 sm:w-1/2 flex items-center border-2 border-lime-300 rounded-md mx-2 md:mx-1 flex-col h-[425px]'>
                <img src={`https://panda-snack-back-v2.vercel.app/meal_picture/${item.Mealpicture}`} alt={item.name} className='hover:rotate-45 transition-all duration-500' width={250}/>
                <h1 className='font-mono text-xl dark:text-white'>{item.name}</h1>
                <h1 className=' text-lg text-slate-700 dark:text-slate-200 text-center'>{item.description}</h1>
                <h1 className='text-xl font-extrabold font-mono text-lime-700 dark:text-lime-200 text-center'>{item.price}.00 DHs</h1>
                <button className='bg-lime-600 text-white py-3 px-5 rounded-2xl hover:bg-lime-500' onClick={()=>{navigate(`order/${item._id}`)}}>
                    Order Now
                </button>
            </div>
        ))}
    </div>
    </div>

  );
};

export default Category;
