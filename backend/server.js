const express = require('express');
const cors = require('cors');
const { createCanvas } = require('canvas');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Train = require('./models/Train');
const Passenger = require('./models/Passenger');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

let captchaStore = {};

// Captcha API
app.get('/api/captcha', (req, res) => {
  const width = 150;
  const height = 50;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000080';
  ctx.fillRect(0, 0, width, height);

  const captchaText = generateCaptcha(5);
  ctx.font = '30px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(captchaText, 20, 35);

  const captchaToken = jwt.sign({ type: "captcha" }, JWT_SECRET, { expiresIn: "1hr" });
  captchaStore[captchaToken] = captchaText;

  res.json({
    captchaToken,
    captchaImage: canvas.toDataURL()
  });
});

function generateCaptcha(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Register API
app.post('/api/register', async (req, res) => {
  const { username, fullName, password, confirmPassword, email, phoneNumber, captcha, captchaToken } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!captchaStore[captchaToken]) {
    return res.status(400).json({ error: 'Captcha validation failed' });
  }
  if (captchaStore[captchaToken] !== captcha) {
    return res.status(400).json({ error: 'Captcha validation failed' });
  }
  delete captchaStore[captchaToken];

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    fullName,
    password: hashedPassword,
    email,
    phoneNumber
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.status(201).json({ message: "User registered successfully", token });
});

// Login API
app.post('/api/login', async (req, res) => {
  const { username, password, captchaInput, captchaToken } = req.body;

  if (!captchaStore[captchaToken] || captchaStore[captchaToken] !== captchaInput) {
    return res.status(400).json({ message: "Invalid captcha" });
  }
  delete captchaStore[captchaToken];

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, fullName: user.fullName },
    JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ message: "Login successful", token, user: { username: user.username, fullName: user.fullName } });
});

// JWT Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
}

// Check Login API
app.get('/api/check-login', authMiddleware, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

//From Suggestions API 
app.get('/api/suggestions/from', async (req, res) => {
  const { q } = req.query;
  try {
    const journeys = await Train.find({
      from: { $regex: new RegExp(`^${q}`, 'i') }
    }).select('fromStation from toStation to');
    const stations = await Train.find({
      fromStation: { $regex: new RegExp(`^${q}`, 'i') }
    }).distinct('fromStation');

    res.json({ journeys, stations });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching suggestions' });
  }
});

//To Suggestions API
app.get('/api/suggestions/to', async (req, res) => {
  const { q } = req.query;
  try {
    const stations = await Train.find({ to: { $regex: new RegExp(`^${q}`, 'i') } }).distinct('toStation');
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching suggestions' });
  }
});

//Trains API
app.get('/api/trains', async (req, res) => {
  const { fromStation, toStation, departureDate } = req.query;
  console.log(`from: ${fromStation}, to: ${toStation}, date: ${departureDate}`)
  try {
    const trains = await Train.find({ fromStation, toStation, departureDate });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching train list' });
  }
});

// Passenger Booking API
app.patch('/api/book-seat/:trainNumber', authMiddleware, async (req, res) => {
  const { trainNumber } = req.params;
  const { berthType, departureDate, passengers } = req.body;

  try {
    const train = await Train.findOne({ trainNumber: trainNumber.toString(), departureDate });
    if (!train) return res.status(404).json({ message: "Train not found" });

    const berth = train.berths.find(b => b.type === berthType);
    if (!berth) return res.status(404).json({ message: "Berth type not found" });

    let remainingSeats = berth.available;

    for (let passenger of passengers) {
      if (remainingSeats > 0) {
        remainingSeats--;
        berth.available--;
        passenger.status = "CONFIRMED";
      } else {
        if (berth.waitingList >= 10) {
          return res.status(400).json({ message: "Waiting list full. Cannot book more tickets." });
        }
        berth.waitingList++;
        passenger.status = "WAITING";
      }
    }

    const bookedPassengers = await Passenger.insertMany(
      passengers.map(p => ({ ...p, trainId: train._id }))
    );

    await train.save();

    res.json({ message: "Booking updated", train, bookedPassengers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Captcha Verify API
app.post("/api/verify-captcha", (req, res) => {
  const { captchaInput, captchaToken } = req.body;

  if (!captchaInput) {
    return res.status(400).json({ success: false, message: "Enter captcha" });
  }
  if (!captchaStore[captchaToken] || captchaStore[captchaToken] !== captchaInput) {
    return res.status(400).json({ success: false, message: "Invalid captcha" });
  }

  delete captchaStore[captchaToken];
  return res.json({ success: true });
});

// Start Server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
