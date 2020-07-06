const mongoose = require('mongoose');
const config = require('config');


const connectDB = async()=>{

  try {
    await mongoose.connect(config.get('MONGO_URI'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected'.green.bold)
    
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  
}

module.exports = connectDB;