const express = require('express');
const router = express.Router();
const { getAllSchedules , getScheduleById } = require('../Controllers/Schedulecontroller');

// Route to get all schedules from today and future days
router.get('/', getAllSchedules);
router.get('/:id', getScheduleById);
module.exports = router;
