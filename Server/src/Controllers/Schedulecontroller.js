const Schedule = require('../Models/Schedule');

const getAllSchedules = async (req, res) => {
  try {

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // { date: { $gte: today } }

    const schedules = await Schedule.find().populate('trainId');

    res.status(200).json({ schedules });
  } catch (error) {
    console.error('Error fetching schedules:', error.message);
    res.status(500).json({ error: 'Unable to fetch schedules' });
  }
};
const getScheduleById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const schedule = await Schedule.findById(id).populate('trainId');
  
      if (!schedule) {
        return res.status(404).json({ error: 'Schedule not found' });
      }
  
      res.status(200).json({ schedule });
    } catch (error) {
      console.error('Error fetching schedule by ID:', error.message);
      res.status(500).json({ error: 'Unable to fetch schedule' });
    }
  };
  
module.exports = {
  getAllSchedules,
  getScheduleById
};
