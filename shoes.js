'use strict';
module.exports = function(models) {

  const allBrands = function(req,res,next) {
    var newshoes = req.body;
    models.create({
      brand: newshoes.brand,
      color: newshoes.color,
      size: newshoes.size,
      in_stock: newshoes.in_stock
    }, function(err, result) {
      if (err) {
        return next(err)
      }
      res.send(result)
    })
  }

  function shoesIntheDatabase(req, res, next) {
    models.find({}).then(function(result) {
      res.json(result);
    }).catch(function(err) {
      return next(err)
    });
  }
   function allTheStocks(req, res, next){
    models.find({}, function(err, par){
      if (err) {
        return next(err)
      }
      res.json({par})
    })
   }
  return {
    allBrands,
    shoesIntheDatabase,
    allTheStocks
  }
}
