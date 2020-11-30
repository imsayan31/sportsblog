const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const app = express();

const mongoDB = 'mongodb://127.0.0.1/sportsblog';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then((response) => {
  console.log('Sports blog connected.');
})
.catch((error) => {
  console.log('Error in DB connection: ' + error);
});

app.use(body_parser.json());

/* Set up for ignoring CORS issue */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader('Content-Type', 'application/json');
  next();
});

/* const CatModel = require('./models/sports-category');
app.get('/', (req, res, next) => {
  const sportsCat = new CatModel({
    category_name: 'Basket Ball',
    category_desc: 'This is basket ball sports description'
  });

  sportsCat.save()
    .then(catSuccess => {
      res.send('Category added.');
      console.log(catSuccess);
    })
    .catch(catErr => {
      res.send('Category can\'t be added.');
      console.log(catErr);
    })
}); */

/* Calling Routes */
const categoryRoutes = require('./routes/sports-category');

/* Assigning Routes */
app.use('/api/sports-category', categoryRoutes);

module.exports = app;
