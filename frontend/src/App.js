import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp/NavbarComp';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
// import Footer from './components/Footer';
import Home from './components/Home/Home';
import News from './components/News/News';
import AlgorithmTrading from './components/AlgorithmTrading/AlgorithmTrading';
import LearnSpace from './components/LearnSpace/LearnSpace';

function App() {
  return (
    <>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
         <Route path="/news" element={<News />} /> 
        <Route path="/algorithm-trading" element={<AlgorithmTrading />} />
        <Route path="/learn-space" element={<LearnSpace />} /> 
       
        {/* Add other routes as necessary */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
