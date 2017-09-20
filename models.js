const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/brands'

// mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, {
  useMongoClient: true
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Database ready to be used');
  }
});
  const Schema = mongoose.Schema;
  const shoesModels = new Schema({
    brand: String,
    color: String,
    size: Number,
    in_stock: Number
});

const brands = mongoose.model('brands', shoesModels);
module.exports = brands;
