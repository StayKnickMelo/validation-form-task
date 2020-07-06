const express = require('express');
const config = require('config');
const colors = require('colors');
const connectDB = require('./config/db');
const form = require('./routes/form');




const app = express();
app.use(express.json({ extend: false }));
connectDB();


app.use('/api', form);


const PORT = process.env.PORT || config.get('PORT');


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});