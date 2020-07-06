const express = require('express');
const config = require('config');
const colors = require('colors');
const connectDB = require('./config/db');
const form = require('./routes/form');
const path = require('path');




const app = express();
app.use(express.json({ extended: false }));
connectDB();


app.use('/api', form);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))


  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});