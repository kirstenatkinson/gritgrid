// Load environment variables
require('dotenv').config();

// Core dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Route files
const index = require('./server/routes/app');
const logRoutes = require('./server/routes/logs');
const workoutRoutes = require('./server/routes/workouts');
const recipeRoutes = require('./server/routes/recipes');

const app = express(); // Create express app

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// CORS setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist/gritgrid/browser')));

// Routes
app.use('/', index);
app.use('/logs', logRoutes);
app.use('/workouts', workoutRoutes);
app.use('/recipes', recipeRoutes);

// Health check (optional but helpful)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Catch-all for Angular routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/gritgrid/browser/index.html'));
});

// Server setup
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log('API running on localhost:' + port);
});