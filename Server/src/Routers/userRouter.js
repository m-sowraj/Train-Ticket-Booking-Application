const express = require('express');
const router = express.Router();
const { loginUser , registerUser } = require('../Controllers/Usercontroller');


router.post('/', registerUser);
router.post('/login', loginUser);


module.exports = router;
