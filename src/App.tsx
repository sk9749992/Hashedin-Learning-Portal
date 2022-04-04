import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import CourseDetail from './Pages/CourseDetail';
import Whislist from './Pages/Whislist';
import ProfileInformation from './Pages/ProfileInformation';
import CheckoutCart from './Pages/CheckoutCart';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/course/:courseId' element={<CourseDetail/>}></Route>
          <Route path='/whislist' element={<Whislist/>}></Route>
          <Route path='/profile' element={<ProfileInformation/>}></Route>
          <Route path='/cart' element={<CheckoutCart/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
