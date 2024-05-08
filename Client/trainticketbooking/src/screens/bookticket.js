import React, { useState ,useEffect } from 'react';

const BookingScreen = () => {
  const [startPlace, setStartPlace] = useState('');
  const [endPlace, setEndPlace] = useState('');
  const [compartmentType, setCompartmentType] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [selectedCompartment, setSelectedCompartment] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    const calculateTotalAmount = () => {
      const startStop = sampleData.stops.find(stop => stop.station === startPlace);
      const endStop = sampleData.stops.find(stop => stop.station === endPlace);

      if (startStop && endStop && selectedCompartment) {
        const distance = endStop.distanceFromFirst - startStop.distanceFromFirst;
        console.log(distance)
        const selectedCompartmentObj = sampleData.trainId.compartments.find(compartment => compartment.type === selectedCompartment);

        if (selectedCompartmentObj) {
          const totalPrice = distance * selectedCompartmentObj.farePerKm;
          setTotalAmount(totalPrice);
        }
      }
    };

    calculateTotalAmount();
  }, [startPlace, endPlace, selectedCompartment]);

  
  const sampleData =  {
    trainId: {
      trainNumber: "12345",
      trainName: "Express Train",
      source: "City A",
      destination: "City B",
      departureTime: new Date("2024-05-10T08:00:00"),
      arrivalTime: new Date("2024-05-10T12:00:00"),
      totalSeats: 100,
      compartments: [
        { type: "AC 1", seats: 50, farePerKm: 1.5, bookedSeats: [] },
        { type: "Sleeper 1", seats: 50, farePerKm: 1, bookedSeats: [] },
        { type: "AC 2", seats: 50, farePerKm: 1.5, bookedSeats: [] },
        { type: "Sleeper 2", seats: 50, farePerKm: 1, bookedSeats: [] },
        { type: "AC 3", seats: 50, farePerKm: 1.5, bookedSeats: [] },
        { type: "Sleeper 3", seats: 50, farePerKm: 1, bookedSeats: [] },
        { type: "AC 4", seats: 50, farePerKm: 1.5, bookedSeats: [] },
        { type: "Sleeper 4", seats: 50, farePerKm: 1, bookedSeats: [] },
      
      ]
    }, 
    date: new Date("2024-05-10"),
    stops: [
      {
        stopNo: 1,
        station: "Station A",
        arrivalTime: new Date("2024-05-10T08:00:00"),
        departureTime: new Date("2024-05-10T08:10:00"),
        distanceFromFirst: 0
      },
      {
        stopNo: 2,
        station: "Station B",
        arrivalTime: new Date("2024-05-10T09:00:00"),
        departureTime: new Date("2024-05-10T09:10:00"),
        distanceFromFirst: 50
      },
      {
        stopNo: 3,
        station: "Station C",
        arrivalTime: new Date("2024-05-10T09:00:00"),
        departureTime: new Date("2024-05-10T09:10:00"),
        distanceFromFirst: 100
      },
      
    ]
  }

  const handleBooking = () => {
    
    console.log('Booking tickets...');
  };

  return (
   <>
    <div style={styles.maincontainer}>
    <div style={styles.leftColumn}>
    <div style={styles.container}>
      <h2>Book Tickets</h2>
      <div style={styles.row}>
        <div style={styles.column}>
          <label>Start Place:</label>
          <select
            value={startPlace}
            onChange={(e) => setStartPlace(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Select Start Place</option>
            {sampleData.stops.map((place, index) => (
              <option key={index} value={place.station}>{place.station}</option>
            ))}
          </select>
        </div>
        <div style={styles.column}>
          <label>End Place:</label>
          <select
            value={endPlace}
            onChange={(e) => setEndPlace(e.target.value)}
            style={styles.dropdown}
            >
            <option value="">Select End Place</option>
            {sampleData.stops.map((place, index) => (
                <option
                key={index}
                value={place.station}
                disabled={place.stopNo <= sampleData.stops.findIndex(stop => stop.station == startPlace)+1}
                >
                {place.station}
                </option>
            ))}
            </select>

        </div>
        <div style={styles.column}>
          <label>Number of Tickets:</label>
          <input
            type="number"
            value={numberOfTickets}
            onChange={(e) => {
                const newValue = parseInt(e.target.value);
                setNumberOfTickets(Math.max(newValue, 1));
            }}
            style={styles.input}
            />
        </div>
      </div>
      
      {/* <div style={styles.footer}>
        <button onClick={handleBooking} style={styles.bookButton}>Choose Compartment</button>
      </div> */}
    </div>

   
    <div style={styles.Compartments}>
      <h2>Choose Compartment</h2>
      
      <div style={styles.compartmentContainer}>
        {sampleData.trainId.compartments.map((type, index) => (
          <div 
            key={index}
            style={{
              ...styles.Compartment,
              backgroundColor: selectedCompartment === type.type ? '#121826' : 'white',
              color: selectedCompartment === type.type ? 'white' : 'black',
            }}
            onClick={() => setSelectedCompartment(type.type)}
          >
            <h5>{type.type}</h5>
          </div>
        ))}
      </div>
    </div>
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
        <div style={styles.footer}>
      <button onClick={handleBooking} style={styles.bookButton}>Check Out</button>
    </div>
    </div>

  </div>
</div>

    </div>
  </>
  );
};

export default BookingScreen;

const styles = {
  maincontainer:{
    display: 'flex',
    flexDirection: 'row',
   
  },
  leftColumn: {
    flex: '0 0 75%',
    marginRight: '20px', 
  },
  
  rightColumn: {
    flex: '0 0 23%',
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
    height:'85vh',
    margin:'20px',
    width:'calc(100% - 70px)',
    borderRadius:20,
    padding:'20px',
    justifyContent: 'center',
    alignItems: 'center',
    
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
    margin:'0 auto',
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
