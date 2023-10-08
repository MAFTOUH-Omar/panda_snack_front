import React from 'react';

const SuccessAlert = ({ message }) => {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative" role="alert">
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current h-6 w-6 text-green-500"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4.293-5.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414L10 11.586l-4.293-4.293a1 1 0 00-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default SuccessAlert;
