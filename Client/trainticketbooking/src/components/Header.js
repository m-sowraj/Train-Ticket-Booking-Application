import React from 'react';

const Header = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>TrainTickets</h2>
{/*            
      <button style={styles.getStartedButton}>Login / Signup</button> */}
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
