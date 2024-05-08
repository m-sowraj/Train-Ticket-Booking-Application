import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>TrainTickets</h2>
           
      <button onClick={() => {navigate('/orderHistory')}} style={styles.getStartedButton}>Order History</button>
    </div>
  );
};

export default Header;

const styles = {
  container: {
    backgroundColor: '#121826',
    color: '#ffffff',
    padding: 30,
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    position:'fixed',
    width:'96%',
    height:'3%',
    
  },
  heading: {
    fontSize: '35px',
  },
  getStartedButton: {
    backgroundColor: '#ff4500',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
