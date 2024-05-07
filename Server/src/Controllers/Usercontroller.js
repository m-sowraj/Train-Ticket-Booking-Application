const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

   
    const existingUserWithEmail = await User.findOne({ email });
    const existingUserWithPhoneNumber = await User.findOne({ phoneNumber });

    if (existingUserWithEmail) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    if (existingUserWithPhoneNumber) {
      return res.status(400).json({ error: 'Phone number is already registered' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);


  
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber
    });

   
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Unable to register user' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

   
    const token = jwt.sign({ userId: user._id }, 'ahdfajdfhajldsfhalsjd', { expiresIn: '20h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'Unable to login' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
