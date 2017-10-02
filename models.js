const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || 'mongodb://localhost/brands';

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
    // id: Number,
    brand: {type: String, require: true},
    color: {type: String, require: true},
    size: {type: Number, require: true},
    in_stock: {type: Number, require: true},
    price: {type: Number, require: true}
});

const brands = mongoose.model('brands', shoesModels);
module.exports = brands;
