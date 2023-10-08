import React, { useState, useEffect } from 'react';
import Light from "../../assets/icons/Light"
import Dark from "../../assets/icons/Dark"

function Test() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
      <button onClick={toggleDarkMode}>
        {darkMode ? <Dark/> : <Light/>}
      </button>
  );
}

export default Test;

