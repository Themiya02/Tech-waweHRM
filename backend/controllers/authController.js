const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with the user's role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Include the role in the token payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the token in the response
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};