'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const exphds = require('express-handlebars');
//export functions by requiring the file name, and the shoes schema
const mongoose = require('mongoose');
const Models = require('./models');
const ShoesRoute = require('./shoes.js');
const shoesRoute = ShoesRoute(Models);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.engine('handlebars', exphds({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('home')
});
//create an GET route that list all shoes in stock.
app.get('/shoes', shoesRoute.allTheStocks);
app.post('/shoes', shoesRoute.allBrands);

app.get('/shoe/brand', shoesRoute.shoesIntheDatabase);
app.post('shoes/brand', shoesRoute.shoesIntheDatabase)

app.use(function(req, res, next){
  console.log("Hello, my favorite color is", req.query.color);
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('App running on:http://localhost:'+ port);
});
