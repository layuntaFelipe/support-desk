const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const {errorHandler} = require(`${__dirname}/middleware/errorMidleware`);
const {connectDB} = require(`${__dirname}/config/db`);
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (_, res) => {
  res.status(200).json({
    message: 'Welcome to the support desk API 😃'
  })
})

//Routes
app.use('/api/users', require(`${__dirname}/routes/userRoutes`));
app.use('/api/tickets', require(`${__dirname}/routes/ticketRoutes`));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} 

app.use(errorHandler);

app.listen(PORT, () => console.log(`💾 Server is starting on port: ${PORT}`));