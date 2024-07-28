// Library imports
require('dotenv/config');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// Local file imports
const routers = require('#routes/routers.js');

// Express app
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;
const app = express();

// Server middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Router middleware
app.use('/api/', routers);

// Connect to database
mongoose.connect(MONGO_URI).then(() => {
  console.log('Now connected to MongoDB database');

  // Start server
  app.listen(PORT, () => {
    console.log(`Express app is now listening on port: ${PORT}`);
  })
});
