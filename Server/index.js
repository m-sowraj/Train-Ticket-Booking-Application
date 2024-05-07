const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Booking = require('./src/Models/Booking')
const Schedule = require('./src/Models/Schedule')
const Train = require('./src/Models/Train')
const User = require('./src/Models/User')
const bookingRouter = require('./src/Routers/bookingRouter')

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/train').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/api/bookings', bookingRouter);
app.listen(3000, () => {
  console.log("Server Deployed");
});
