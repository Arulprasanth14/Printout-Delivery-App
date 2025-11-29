const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const shopOwnerModel = require('../models/shopOwnerModel');
const nodemailer = require("nodemailer");
// Register
const register = async (req, res) => {
  try {
    const { email, shop_name, mobile, address, password, confirmPassword } = req.body;

    if (!email || !shop_name || !mobile || !address || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingOwner = await shopOwnerModel.getShopOwnerByEmail(email);
    if (existingOwner) {
      return res.status(400).json({ message: 'Shop owner already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ownerId = await shopOwnerModel.createShopOwner(email, shop_name, mobile, address, hashedPassword);

    res.status(201).json({ message: 'Registration successful', ownerId });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const shopOwner = await shopOwnerModel.getShopOwnerByEmail(email);
    if (!shopOwner) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, shopOwner.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { ownerId: shopOwner.id, email: shopOwner.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const ownerId = req.user.ownerId;
    const owner = await shopOwnerModel.getShopOwnerById(ownerId);

    if (!owner) return res.status(404).json({ message: 'Shop owner not found' });

    res.json({
      email: owner.email,
      shop_name: owner.shop_name,
      mobile: owner.mobile,
      address: owner.address,
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};

// Update Profile
const updateShopOwner = async (req, res) => {
  try {
    const { shop_name, mobile, address } = req.body;
    const ownerId = req.user.ownerId;

    const updated = await shopOwnerModel.updateShopOwner(ownerId, shop_name, mobile, address);
    res.json({ message: 'Profile updated', data: updated });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const ownerId = req.user.ownerId;

    const owner = await shopOwnerModel.getShopOwnerById(ownerId);
    if (!owner) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, owner.password);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await shopOwnerModel.updatePassword(ownerId, hashed);

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Password change failed' });
  }
};



const otpStore = {}; // Ideally use Redis or DB in production

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await shopOwnerModel.getShopOwnerByEmail(email);
  if (!user) return res.status(404).json({ message: "Email not found" });

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[email] = otp;

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Your OTP for Password Reset',
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).json({ message: 'Failed to send OTP' });
    res.json({ message: 'OTP sent successfully' });
  });
};

const verifyOtpAndChangePassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;
  if (!email || !otp || !newPassword || !confirmPassword)
    return res.status(400).json({ message: "All fields are required" });

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  if (otpStore[email] !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  const user = await shopOwnerModel.getShopOwnerByEmail(email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const hashed = await bcrypt.hash(newPassword, 10);
  await shopOwnerModel.updatePassword(user.id, hashed);

  delete otpStore[email]; // Clean up OTP
  res.json({ message: "Password updated successfully" });
};


module.exports = {
  register,
  login,
  getProfile,
  updateShopOwner,
  changePassword,
  verifyOtpAndChangePassword,
  sendOtp,
};
