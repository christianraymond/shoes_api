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

app.use(function(req, res, next){

res.header('Access-Control-Allow-Origin', "*");
res.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
next();
})

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
app.get('/shoes', shoesRoute.displayAllBrandFunc);
//create a POST route that allow to create new brand in the database.
app.post('/shoes', shoesRoute.createBrands);
//create a GET route that list all shoes for a given brand.
app.get('/shoes/brand/:brandName', shoesRoute.listSpecificBrandShoes);
//create a GET route that list all shoes for a given size.
app.get('/shoes/size/:brandSize', shoesRoute.listSpecificBrandSize);
//create a GET route that list all shoes for a given brand and size.
app.get('/shoes/brand/:brandName/size/:brandSize', shoesRoute.listSpecificBrandAndSize);
//create a brandAndsize GET route for dropdownOutput
app.get("/shoes/filterDropdown", shoesRoute.dropdownOutput);
//create a POST route that update the stock levels when a shoe is sold.
app.post('/shoes/sold/brand/:id/amount/:amount', shoesRoute.findOneAndUpdate);
//create a POST route that updates the stock whenever the shoe is added, stock should increase.
app.post('/shoes/addBrand/brand/:id/amount/:amount', shoesRoute.addNewShoeToStock);

const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('App running on:http://localhost:'+ port);
});
