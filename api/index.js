const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const bcryptSalt = bcrypt.genSaltSync(10);
require('dotenv').config();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  })
);
mongoose.connect(process.env.MONGO_URL);
app.get('/test', (req, res) => {
  res.json('test okay');
});

// BkcSwSH7UbOegbZS;
// tdennisdeveloper;
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const UserDocument = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json(UserDocument);
});

app.listen(4000);
