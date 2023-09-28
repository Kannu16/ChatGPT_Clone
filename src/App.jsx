import React, { useEffect } from 'react';
import MainBody from './components/MainBody';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { ToggleProvider } from './utils/ToggleContext';

const MyComponent = () => {

  useEffect(() => {
    AOS.init()
  }, []);

  return (
    <ToggleProvider>
      <MainBody />
    </ToggleProvider>
  );
};

export default MyComponent;

