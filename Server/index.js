const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();

const Booking = require('./src/Models/Booking');
const Schedule = require('./src/Models/Schedule');
const Train = require('./src/Models/Train');
const User = require('./src/Models/User');
const bookingRouter = require('./src/Routers/bookingRouter');
const userRouter = require('./src/Routers/userRouter');
const scheduleRouter = require('./src/Routers/ScheduleRouter');

app.use(express.json());
app.use(cors()); 

mongoose.connect('mongodb+srv://Sowraj:sowrajadya.ai@trainticketbooking.t6admlm.mongodb.net/').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/bookings', bookingRouter);
app.use('/api/user', userRouter);
app.use('/api/schedules', scheduleRouter);

app.listen(3000, () => {
  console.log("Server Deployed");
});
