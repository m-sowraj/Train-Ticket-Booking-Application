import React, { useState, useEffect } from 'react';
import api from '../api';

const OrderHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await api.get('/bookings/history');
        const sortedBookings = response.data.bookings.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));
        setBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Order History</h1>

      {bookings.length > 0 ? (
        <div style={TableStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Booking ID</th>
                <th style={thStyle}>Train Number</th>
                <th style={thStyle}>Train Name</th>
                <th style={thStyle}>Booking Date</th>
                <th style={thStyle}>Seats Booked</th>
                <th style={thStyle}>Compartment</th>
                <th style={thStyle}>Total Amount</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td style={tdStyle}>{booking._id}</td>
                  <td style={tdStyle}>{booking.trainId.trainNumber}</td>
                  <td style={tdStyle}>{booking.trainId.trainName}</td>
                  <td style={tdStyle}>{new Date(booking.bookingDate).toLocaleString()}</td>
                  <td style={tdStyle}>{booking.seatsBooked.join(', ')}</td>
                  <td style={tdStyle}>{booking.compartmentType}</td>
                  <td style={tdStyle}>{booking.totalAmount}</td>
                  <td style={tdStyle}>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={noBookingsStyle}>No bookings found.</p>
      )}
    </div>
  );
};

const containerStyle = {
  margin: '20px auto',
  width: '90%',
  padding: '20px',
};

const TableStyle = {
  margin: '20px auto',
  width: '100%',
  padding: '20px',
  backgroundColor: '#f3f4f6',
  borderRadius: 10,
};

const headingStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid #ddd',
  backgroundColor: 'white',
};

const thStyle = {
  backgroundColor: '#131825',
  borderBottom: '2px solid #ddd',
  padding: '8px',
  color: 'white',
};

const tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
};

const noBookingsStyle = {
  fontStyle: 'italic',
};

export default OrderHistory;
