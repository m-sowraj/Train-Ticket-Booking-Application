const Booking = require('../Models/Booking');
const Train = require('../Models/Train');
const Schedule = require('../Models/Schedule');


const bookTicket = async (req, res) => {
  try {
    const { trainId, compartmentType, numSeats, startStation , endStation , userId , scheduleId } = req.body;

 
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }


    const compartment = train.compartments.find(comp => comp.type === compartmentType);
    if (!compartment) {
      return res.status(404).json({ error: 'Compartment type not found' });
    }

    const bookedSeats = compartment.bookedSeats.map(seat => parseInt(seat));

  
    let startSeatIndex = -1;
    let continuousSeats = 0;
    for (let i = 1; i <= compartment.seats; i++) {
      if (!bookedSeats.includes(i)) {
        if (startSeatIndex === -1) {
          startSeatIndex = i;
        }
        continuousSeats++;
        if (continuousSeats === numSeats) {
          break;
        }
      } else {
        startSeatIndex = -1;
        continuousSeats = 0;
      }
    }

    if (continuousSeats === numSeats) {
      const bookedSeatNumbers = [];
      for (let i = startSeatIndex; i < startSeatIndex + numSeats; i++) {
        bookedSeatNumbers.push(i.toString());
        compartment.bookedSeats.push(i.toString());
      }

    
      const schedule = await Schedule.findById(scheduleId);
      if (!schedule) {
        return res.status(404).json({ error: 'Schedule not found for the train' });
      }
      

    
    let startvalue = -1;
    let endvalue = -1;
    for (let i = 0; i < schedule.stops.length; i++) {
        if (schedule.stops[i].station === startStation) {
            startvalue = schedule.stops[i].distanceFromFirst;
        }
    if (schedule.stops[i].station === endStation) {
            endvalue = schedule.stops[i].distanceFromFirst;
        break; 
        }
    }

    
    if (startvalue === -1 || endvalue === -1) {
    return res.status(400).json({ error: 'Start or end station not found in schedule' });
    }

    let totalDistance = Math.abs(endvalue - startvalue);
    
    
      const totalAmount = totalDistance * compartment.farePerKm * numSeats;

      
      await train.save();

     
      const booking = await Booking.create({
        userId,
        trainId,
        bookingDate: new Date(),
        seatsBooked: bookedSeatNumbers,
        compartmentType,
        totalAmount,
        status: 'confirmed'
      });

      res.status(201).json({ booking, bookedSeats: bookedSeatNumbers, totalAmount });
    } else {
      res.status(400).json({ error: 'Insufficient continuous seats available' });
    }
  } catch (error) {
    console.error('Error booking ticket:', error.message);
    res.status(500).json({ error: 'Unable to book ticket' });
  }
};



const cancelBooking = async (req, res) => {
    try {
      const { bookingId } = req.params;
  
     
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
  
      const train = await Train.findById(booking.trainId);
      if (!train) {
        return res.status(404).json({ error: 'Train not found' });
      }
  

      const compartment = train.compartments.find(comp => comp.type === booking.compartmentType);
      if (!compartment) {
        return res.status(404).json({ error: 'Compartment type not found' });
      }

      booking.seatsBooked.forEach(seatNumber => {
        const index = compartment.bookedSeats.indexOf(seatNumber);
        if (index !== -1) {
          compartment.bookedSeats.splice(index, 1);
        }
      });
  
   
      await train.save();
  

      await Booking.findByIdAndDelete(bookingId);
  
      res.json({ message: 'Booking canceled successfully' });
    } catch (error) {
      console.error('Error canceling booking:', error.message);
      res.status(500).json({ error: 'Unable to cancel booking' });
    }
  };
  
  const getAllBookingsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  

      const bookings = await Booking.find({ userId });
  
     
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      res.status(200).json({ bookings });
    } catch (error) {
      console.error('Error fetching bookings by user ID:', error.message);
      res.status(500).json({ error: 'Unable to fetch bookings' });
    }
  };
  
  
module.exports = {
  bookTicket,
  cancelBooking,
  getAllBookingsByUserId
};
