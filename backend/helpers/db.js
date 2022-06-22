const mongoose = require('mongoose');

const connectDB = async (DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
    });
    console.log('MongoDb connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
