import { useState, useEffect } from 'react';

// Function that get continously the width of the screen

function getWindowDimensions() {
  // Check weather the code is rendered in node or in browser
  const isBrowser = () => typeof window !== "undefined"
  let width,height;
 if(isBrowser()){
const { innerWidth: width, innerHeight: height } = window;
 
return {
  width,
  height
};
}

  
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}