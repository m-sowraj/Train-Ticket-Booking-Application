const express = require('express');
const router = express.Router();
const { bookTicket,
    cancelBooking,
    getAllBookingsByUserId} = require('../Controllers/Bookingcontroller');

// Route to book tickets
router.post('/', bookTicket);
router.post('/cancel/:bookingId', cancelBooking);
router.get('/:userId', getAllBookingsByUserId);


module.exports = router;
