const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./helpers/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/user'));

//DataBase
connectDB(process.env.DATABASE_URL);

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
