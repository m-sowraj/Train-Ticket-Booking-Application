import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


const PaymentScreen = ({ isOpen, onRequestClose , sampleData , startPlace , endPlace , selectedCompartment , totalAmount , numberOfTickets , seats}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [CardName, setCardName] = useState('')
  const navigate = useNavigate();
  
  const handlePayment = () => {
    
    console.log('Payment processing...');
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      
    },
    content: {
       display: 'flex',
      width: '63%',
      height:'60%',
      alignItems:'center',
      justifyContent: 'space-between',
      margin: 'auto',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  };

  const inputContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  };

  const inputStyles = {
    flex: '1',
    marginRight: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius:5,
    border: '1px solid #ccc',
  };

  const buttonStyles = {
    backgroundColor: 'green',
    color: 'white',
    padding: '15px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    border: 'none',
    marginBottom: '20px',
  };

  const inputStyles2={

    marginRight: '10px',
    padding: '10px',
    width:'90%',
    fontSize: '16px',
    
   
    border: '1px solid #ccc',
  }
  const form ={
    backgroundColor:'#f3f4f6',
    padding:'20px',
    width:'90%',
    borderRadius:15,
    height:'45vh'
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      style={modalStyles}
    >
    <div style={styles.maincontainer}>
      <div style={styles.leftColumn}>
      
        <form style={form}>
        <h2 style={{ color: '#2196F3', marginBottom: '30px' }}>Payment Details</h2>

        <div style={inputContainerStyles}>
            <input
              type="text"
              placeholder="Name on Card"
              id="cardName"
              value={CardName}
              onChange={(e) => setCardName(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div style={inputContainerStyles}>
            <input
              type="text"
              placeholder="Card Number"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div style={inputContainerStyles}>
            <div style={{ flex: '1', marginRight: '10px' }}>
              <input
                type="text"
                id="expiryDate"
                placeholder="Expiry Date"

                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                style={inputStyles2}
              />
            </div>
            <div style={{ flex: '1' }}>
              <input
                type="text"
                id="cvv"
                placeholder="cvv"

                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                style={inputStyles2}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handlePayment}
            style={buttonStyles}
          >
            Payment Success
          </button>
        </form>
      </div>

      <div style={styles.rightColumn}>
        <div style={styles.rightcontainer}>
        <h2>Your Ticket</h2>
        <div style={styles.billInfo}>
        <div style={styles.billInfoItem}>
            <strong>Train Name:</strong>
            <span style={styles.value}>{sampleData.trainId.trainName}</span>
        </div>
        <div style={styles.billInfoItem}>
            <strong>Route:</strong>
            <span style={styles.value}>{startPlace} - {endPlace}</span>
        </div>
        <div style={styles.billInfoItem}>
            <strong>Number of Tickets:</strong>
            <span style={styles.value}>{numberOfTickets}</span>
        </div>
        <div style={styles.billInfoItem}>
            <strong>Compartment:</strong>
            <span style={styles.value}>{selectedCompartment}</span>
        </div>
        <div style={styles.billInfoItem}>
            <strong>Total Amount:</strong>
            <span style={styles.value}>₹{totalAmount * numberOfTickets}</span>
        </div>
        <div style={styles.billInfoItem}>
        <strong>Booked Seat No's:</strong>
        <span style={styles.value}>
  {numberOfTickets === 1 
    ? seats[0] 
    : `${seats[0]} to ${seats[seats.length - 1]}`
  }
</span>

        </div>
        <div style={styles.buttoncontainer}>
        <div style={styles.footer}>
      <button  style={styles.bookButton1}>Order Success</button>
         </div>

    <div style={styles.footer}>
      <button  onClick={() => {navigate('/orderHistory')}} style={styles.bookButton}>View Orders</button>
    </div>
        </div>
        
   
    </div>

     </div>
     </div>

    </div>
    </Modal>
  );
};

export default PaymentScreen;


const styles = {
  maincontainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  leftColumn: {
    flex: '0 0 75%',
    marginRight: '20px', 
  },
  buttoncontainer:{
    display:'flex',
    flexDirection:'row'
  },
  rightColumn: {
    flex: '0 0 25%',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  container: {
    padding: '20px',
    maxWidth: '90%',
    margin: '0 auto',
    backgroundColor: '#f3f4f6',
    color: 'black',
    borderRadius:20,
    justifySelf: 'center',
    alignSelf: 'center',
    marginTop:25,
  },
  rightcontainer:{
    backgroundColor: '#f3f4f6',
    

    borderRadius:20,
    padding:'20px',
    justifyContent: 'center',
    alignItems: 'center',
    width:'150%',
    height:'45vh'

    
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  column: {
    flex: 1,
    marginRight: '20px',
  },
  footer: {
     
    margin:'0 auto'
  },
  bookButton: {
    backgroundColor: '#121826',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin:'5px auto',
    width:'90%',
    
  },
  bookButton1: {
    backgroundColor: 'green',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin:'5px auto',
    width:'90%',
    
  },
  Compartments:{
    padding: '20px',
    maxWidth: '70%',
    margin: '0 auto',
   
  },
  compartmentContainer: {
    maxHeight: '50%',
    width: '68%',
    overflowY: 'auto',
    position: 'fixed',
    bottom: '5%',
    left:0,
    backgroundColor: 'white', 
    padding: '20px',
    borderRadius: '20px 20px 0 0', 
  },  
  Compartment:{
    width: '90%',
    margin: '10px auto',
    border: '1px solid #ccc',
    borderRadius:10,
    padding: '10px',
    cursor: 'pointer',
  },
  dropdown: {
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '0px solid #ccc',
    marginBottom: '10px',
  },
  input: {
    width: 'calc(100% - 22px)',
    padding: '10px',
    borderRadius: '5px',
    border: '0px solid #ccc',
    marginBottom: '10px',
  },
  billContainer: {
    width: '50%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  },
  billTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#121826',
  },
  billInfo: {
    marginBottom: '20px',
  },
  billInfoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  value: {
    textAlign: 'right',
  },
};