const mongoose = require('mongoose');

const connectDB = (url) => {
  try {
    mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false, 
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
