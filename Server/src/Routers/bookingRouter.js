const express = require('express');
const router = express.Router();
const { bookTicket,
    cancelBooking,
    getAllBookingsByUserId} = require('../Controllers/Bookingcontroller');
const authenticateToken = require('../Middleware/authenticateToken');

// Route to book tickets
router.post('/', authenticateToken , bookTicket);
router.post('/cancel/:bookingId', cancelBooking);
router.get('/history',  authenticateToken ,getAllBookingsByUserId);


module.exports = router;
