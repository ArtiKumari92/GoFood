const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require("./db")
// Connect to MongoDB
mongoDB();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Enable JSON parsing
app.use(express.json());

// API routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api/auth', require('./Routes/GetLocation'));
//app.use('/api/auth', require('./Routes/Auth')); // Assuming getlocation route is here

// Root test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});