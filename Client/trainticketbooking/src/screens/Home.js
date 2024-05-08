import React, { useState , useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { dotStream } from 'ldrs'
import { useNavigate } from 'react-router-dom';
import api from '../api';
dotStream.register()

const Home = () => {
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [sampleData, setSampleData] = useState([]);
    // const sampleData = [
    //     {
    //       trainId: {
    //         trainNumber: "12345",
    //         trainName: "Express Train",
    //         source: "City A",
    //         destination: "City B",
    //         departureTime: new Date("2024-05-10T08:00:00"),
    //         arrivalTime: new Date("2024-05-10T12:00:00"),
    //         totalSeats: 100,
    //         compartments: [
    //           { type: "AC", seats: 50, farePerKm: 1.5, bookedSeats: [] },
    //           { type: "Sleeper", seats: 50, farePerKm: 1, bookedSeats: [] }
    //         ]
    //       }, 
    //       date: new Date("2024-05-10"),
    //       stops: [
    //         {
    //           stopNo: 1,
    //           station: "Station A",
    //           arrivalTime: new Date("2024-05-10T08:00:00"),
    //           departureTime: new Date("2024-05-10T08:10:00"),
    //           distanceFromFirst: 0
    //         },
    //         {
    //           stopNo: 2,
    //           station: "Station B",
    //           arrivalTime: new Date("2024-05-10T09:00:00"),
    //           departureTime: new Date("2024-05-10T09:10:00"),
    //           distanceFromFirst: 50
    //         },
            
    //       ]
    //     },
    //     {
    //       trainId: {
    //         trainNumber: "12345",
    //         trainName: "Express Train",
    //         source: "City A",
    //         destination: "City B",
    //         departureTime: new Date("2024-05-10T08:00:00"),
    //         arrivalTime: new Date("2024-05-10T12:00:00"),
    //         totalSeats: 100,
    //         compartments: [
    //           { type: "AC", seats: 50, farePerKm: 1.5, bookedSeats: [] },
    //           { type: "Sleeper", seats: 50, farePerKm: 1, bookedSeats: [] }
    //         ]
    //       },
    //       date: new Date("2024-05-11"),
    //       stops: [
    //         {
    //           stopNo: 1,
    //           station: "Station C",
    //           arrivalTime: new Date("2024-05-11T08:00:00"),
    //           departureTime: new Date("2024-05-11T08:10:00"),
    //           distanceFromFirst: 0
    //         },
    //         {
    //           stopNo: 2,
    //           station: "Station D",
    //           arrivalTime: new Date("2024-05-11T09:00:00"),
    //           departureTime: new Date("2024-05-11T09:10:00"),
    //           distanceFromFirst: 80 
    //                     },
            
    //       ]
    //     },
    //     {
    //       trainId: {
    //         trainNumber: "12345",
    //         trainName: "Express Train",
    //         source: "City A",
    //         destination: "City B",
    //         departureTime: new Date("2024-05-10T08:00:00"),
    //         arrivalTime: new Date("2024-05-10T12:00:00"),
    //         totalSeats: 100,
    //         compartments: [
    //           { type: "AC", seats: 50, farePerKm: 1.5, bookedSeats: [] },
    //           { type: "Sleeper", seats: 50, farePerKm: 1, bookedSeats: [] }
    //         ]
    //       },
    //       date: new Date("2024-05-12"),
    //       stops: [
    //         {
    //           stopNo: 1,
    //           station: "Station E",
    //           arrivalTime: new Date("2024-05-12T08:00:00"),
    //           departureTime: new Date("2024-05-12T08:10:00"),
    //           distanceFromFirst: 0
    //         },
    //         {
    //           stopNo: 2,
    //           station: "Station F",
    //           arrivalTime: new Date("2024-05-12T09:00:00"),
    //           departureTime: new Date("2024-05-12T09:10:00"),
    //           distanceFromFirst: 70 
    //         },
           
    //       ]
    //     },
    //     {
    //         trainId:{
    //             trainNumber: "12345",
    //             trainName: "Express Train",
    //             source: "City A",
    //             destination: "City B",
    //             departureTime: new Date("2024-05-10T08:00:00"),
    //             arrivalTime: new Date("2024-05-10T12:00:00"),
    //             totalSeats: 100,
    //             compartments: [
    //               { type: "AC", seats: 50, farePerKm: 1.5, bookedSeats: [] },
    //               { type: "Sleeper", seats: 50, farePerKm: 1, bookedSeats: [] }
    //             ]
    //           },
    //         date: new Date("2024-05-12"),
    //         stops: [
    //           {
    //             stopNo: 1,
    //             station: "Station G",
    //             arrivalTime: new Date("2024-05-12T08:00:00"),
    //             departureTime: new Date("2024-05-12T08:10:00"),
    //             distanceFromFirst: 0
    //           },
    //           {
    //             stopNo: 2,
    //             station: "Station H",
    //             arrivalTime: new Date("2024-05-12T09:00:00"),
    //             departureTime: new Date("2024-05-12T09:10:00"),
    //             distanceFromFirst: 70 
    //           },
    //           {
    //             stopNo: 3,
    //             station: "Station I",
    //             arrivalTime: new Date("2024-05-12T09:00:00"),
    //             departureTime: new Date("2024-05-12T09:10:00"),
    //             distanceFromFirst: 70 
    //           },
             
    //         ]
    //       },
    //   ];
      
      useEffect(() => {
        api.get('/schedules')
            .then(response => {
                setSampleData(response.data.schedules);
                setFilteredItems(response.data.schedules)
                // console.log(response.data.schedules)
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching sample data:', error);
                setLoading(false); 
            });
    }, []);

    const allStations =  Array.from(new Set(sampleData.flatMap(schedule => schedule.stops.map(stop => stop.station))));
    console.log(allStations)
      const allfromStations = Array.from(new Set(
        sampleData.flatMap(schedule =>
          schedule.stops.slice(0, -1).map(stop => stop.station)
        )
      ));
      

      const [fromStation, setFromStation] = useState('');
      const [toStation, setToStation] = useState('');
      const [filteredStations, setFilteredStations] = useState(allStations);
      const [filteredItems, setFilteredItems] = useState(sampleData);


      
  
      const handleFromStationChange = (event) => {
        const selectedFromStation = event.target.value;
   
        setFromStation(selectedFromStation);
    
        
        const fromSchedules = sampleData.filter(schedule =>
            schedule.stops.some(stop => stop.station == selectedFromStation)
        );
       
        const futureStations = [];
        for (let i = 0; i < fromSchedules.length; i++) {
            
            const schedule = fromSchedules[i];
            const stops = schedule.stops;
           
            let selectedFromStationnum = -1;
            for (let j = 0; j < stops.length; j++) {
             
                if (stops[j].station == selectedFromStation ) {
                  
                    selectedFromStationnum = stops[j].stopNo;
                    console.log( selectedFromStationnum)
                }
            }
            if(selectedFromStationnum != -1){
                for (let j = 0; j < stops.length; j++) {
                    const stop = stops[j];
                    if (stop.stopNo > selectedFromStationnum) {
                        futureStations.push(stop.station);
                    }
                }
            }
         
        }
        const uniqueFutureStations = Array.from(new Set(futureStations));



    
        setFilteredStations(uniqueFutureStations);
    
        if (!futureStations.includes(toStation)) {
            setToStation('');
        }
    };
    
      
      const handleToStationChange = (event) => {
          setToStation(event.target.value);
      };

      const handleSearch = () => {
        const filtered = [];
        
        for (const data of sampleData){
        let fromStopNo, toStopNo;
        for (const stop of data.stops) {
          if (stop.station === fromStation) {
            fromStopNo = stop.stopNo;
          }
          if (stop.station === toStation) {
            toStopNo = stop.stopNo;
          }
        }
         
        if(fromStopNo < toStopNo ){
            filtered.push(data);
        }
    }
      
        setFilteredItems(filtered);
      };
      


  return (
    <>


    {loading ? (
      <div style={styles.loader}>
                <l-dot-stream
                size="300"
                speed="2.5" 
                color="black" 
              ></l-dot-stream>
              </div>
            ) : (
              <>
                  <Header />
    <div style={styles.container}>
    
      <h2 style={styles.heading}>Find the perfect train for your journey</h2>
      
      <div style={styles.searchContainer}>
        <select value={fromStation} onChange={handleFromStationChange} style={styles.dropdown}>
          <option value="">From</option>
          {allfromStations.map((station, index) => (
            <option key={index} value={station}>{station}</option>
          ))}
        </select>
        <select value={toStation} onChange={handleToStationChange} style={styles.dropdown}>
          <option value="">To</option>
          {filteredStations.map((station, index) => (
            <option key={index} value={station}>{station}</option>
          ))}
        </select>
        <input type="date" style={styles.dateInput} />
        <button style={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>
      </div>
      <div style={styles.itemscontainer} >
        {filteredItems.map((schedule, index) => (
          <div key={index} style={styles.scheduleItem} onClick={() => navigate(`/train/${schedule._id}`) }>
            <h3>{schedule.trainId.trainNumber} - {schedule.trainId.trainName}</h3>
        
            {/* <h4>Stops:</h4>
            <ul>
              {schedule.stops.map((stop, stopIndex) => (
                <li key={stopIndex}>
                  Stop {stop.stopNo}: {stop.station} - Arrival: {stop.arrivalTime.toLocaleTimeString()}, Departure: {stop.departureTime.toLocaleTimeString()}, Distance from first: {stop.distanceFromFirst} km
                </li>
              ))}
            </ul> */}
            <p>{schedule.trainId.source} to {schedule.trainId.destination}</p>
            {/* <p>{schedule.trainId.departureTime.toLocaleDateString()} {schedule.trainId.departureTime.toLocaleTimeString()} - {schedule.trainId.arrivalTime.toLocaleDateString()}{schedule.trainId.arrivalTime.toLocaleTimeString()}</p> */}
          </div>
        ))}
      </div> 
      <Footer />
      </>
            )}

 
    
    
    </>
  );
};

export default Home;

const styles = {
  container: {
    backgroundColor: '#121826',
    color: '#ffffff',
    padding: '20px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '55px',
    margin: '0 auto',
    width: '60%', 
    marginTop: '10%'
  },
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    alignItems:'center',
    justifyContent:'center',
    textAlign: 'center',
    color: '#fff',
    fontSize: '20px',
    padding: '20px',
},
  txt: {
    textAlign: 'center',
    fontSize: '20px',
    margin: '0 auto',
    width: '60%', 
  },
  searchContainer: {
    textAlign: 'center',

    backgroundColor:'white',
    borderRadius:'10px',
    margin: '20px auto',
    width:'50%',
    padding:'20px 2%'
  },
  dropdown: {
    padding: '10px',
    width:'25%',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  dateInput: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '150px',
  },
  searchButton: {
    backgroundColor: '#ff4500',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  getStartedButton: {
    backgroundColor: '#ff4500',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  itemscontainer:{
    backgroundColor: '#f3f4f6',
    padding: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  scheduleItem: {
    backgroundColor: 'white',
    padding: '20px',
    margin: '20px 20px',
    borderRadius: '10px',
    width:'27.9%'
  }
};
