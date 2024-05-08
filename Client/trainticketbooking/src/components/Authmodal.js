import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../api';

const AuthModal = ({ isOpen, onRequestClose }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
  const [currentPage, setCurrentPage] = useState('login');
  const [error, setError] = useState('');



  const handleLogin = async () => {
    console.log('Login email:', loginEmail);
    console.log('Login password:', loginPassword);

    if (!loginEmail || !loginPassword) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      const loginResponse = await api.post('/user/login', {
        email: loginEmail,
        password: loginPassword
      });
      
      if(loginResponse.status == 220){
        alert('Invalid credentials')
      }
      else{

        const authToken = loginResponse.data.token;
      
        if(authToken){
          localStorage.setItem('authToken', authToken);
          onRequestClose();
    
        }

      }

     
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in. Please try again.');
    }
  };
  

  

  const handleRegister = async () => {

    console.log('Register name:', registerName);
    console.log('Register email:', registerEmail);
    console.log('Register password:', registerPassword);
    console.log('Register phone number:', registerPhoneNumber);
  

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(registerPassword)) {
      setError('Password must contain at least 8 characters, including at least one number, one lowercase letter, one uppercase letter, and one special character.');
      return;
    }
  
 
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(registerPhoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
  
    try {
 
      const registerresponse = await api.post('/user/', {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        phoneNumber: registerPhoneNumber
      });

      if(registerresponse.status == 220){
        alert('Email is already registered')
      }
      else if(registerresponse.status == 221){
        alert('Phone number is already registered')
      }
      else if(registerresponse.status == 201){
        const loginResponse = await api.post('/user/login', {
          email: registerEmail,
          password: registerPassword
        });
    
  
        const authToken = loginResponse.data.token;
        
        if(authToken){
          localStorage.setItem('authToken', authToken);
          onRequestClose();
    
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while registering. Please try again.');
    }
  };
  

  const isLoginValid = loginEmail && loginPassword;
  const isRegisterValid = registerName && registerEmail && registerPassword && registerPhoneNumber;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Authentication Modal"
      shouldCloseOnOverlayClick={false} 
      style={customStyles}
    >
      <div style={containerStyle}>
        {currentPage === 'login' && (
          <>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={inputStyle}
            />
            {error && <p style={errorStyle}>{error}</p>}
            <button disabled={!isLoginValid} onClick={handleLogin} style={buttonStyle}>Login</button>
            <p onClick={() => setCurrentPage('register')} style={linkStyle}>Register</p>
          </>
        )}
        {currentPage === 'register' && (
          <>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={registerPhoneNumber}
              onChange={(e) => setRegisterPhoneNumber(e.target.value)}
              style={inputStyle}
            />
            {error && <p style={errorStyle}>{error}</p>}
            <button disabled={!isRegisterValid} onClick={handleRegister} style={buttonStyle}>Register</button>
            <p onClick={() => setCurrentPage('login')} style={linkStyle}>Back to Login</p>
          </>
        )}
      </div>
    </Modal>
  );
};

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    padding: '30px',
    width: '25%',
  }
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  width: '90%',
  boxSizing: 'border-box',
  
  border: '0.5px solid #ccc',
  borderRadius: '5px'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '90%',
  marginBottom: '10px'
};

const containerStyle = {
  textAlign: 'center'
};

const linkStyle = {
  color: '#007bff',
  cursor: 'pointer'
};

const errorStyle = {
  color: 'red',
  marginBottom: '10px'
};

export default AuthModal;
