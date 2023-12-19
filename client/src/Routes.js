// routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
// import About from './About';

const MyRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default MyRoutes;
