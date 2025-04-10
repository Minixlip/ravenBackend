require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const shopRoutes = require('./routes/Shop');
const usersRoutes = require('./routes/Users');
const paymentRoutes = require('./routes/Payment');
// PORT
const port = process.env.PORT;
const mongoURI =
  'mongodb+srv://minixliplol1:6P2n92eMtSVt6Qab@cluster0.rftwlma.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// cors
app.use(cors());

//routes
app.use('/api/shop', shopRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/payment', paymentRoutes);

// connect to db
mongoose
  .connect(mongoURI)
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log('Connected to DB & listening on port:', port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
