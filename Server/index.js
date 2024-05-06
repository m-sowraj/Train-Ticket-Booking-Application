const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://Sowraj:sowrajadya.ai@trainticketbooking.t6admlm.mongodb.net/trainticketbooking').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(3000, () => {
  console.log("Server Deployed");
});
