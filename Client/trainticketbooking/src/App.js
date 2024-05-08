import React, { useState } from 'react';
import Home from './screens/Home'
import BookingScreen from './screens/bookticket';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {
  
  return (
    <div className="App" >
      {/* <Header />
      <Home />
      <Footer /> */}
      {/* <BookingScreen /> */}

      <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/train" element={<BookingScreen />} />
      </Routes>
      </Router>
    </div>
  );
};

export default App;
