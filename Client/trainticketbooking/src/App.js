import React, { useState, useEffect } from 'react';
import Home from './screens/Home'
import BookingScreen from './screens/bookticket';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthModal from './components/Authmodal';
import Modal from 'react-modal';
import OrderHistory from './screens/OrderHistory';

Modal.setAppElement('#root');

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);


  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken === null) {
      openAuthModal();
    } 
  }, [isAuthModalOpen]); 

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="App" >
      <Router>
        <AuthModal
          isOpen={isAuthModalOpen}
          onRequestClose={closeAuthModal}
          onLoginSuccess={() => closeAuthModal }
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train/:id" element={<BookingScreen />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
