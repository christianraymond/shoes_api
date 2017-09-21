'use strict';
module.exports = function(models) {

  const createBrands = function(req, res, next) {
    const newshoes = req.body;
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

  function displayAllBrandFunc(req, res, next) {
    models.find({}, function(err, All) {
      if (err) {
        return next(err)
      }
      res.json(All)
    })
  }

  function listSpecificBrandShoes(req, res, next) {
    const singleBrandName = req.params.brandName;
    models.find({
      brand: singleBrandName
    }, function(err, singleBrand) {
      if (err) {
        return next(err)
      }
      res.json(singleBrand)
    })
  }

  function listSpecificBrandSize(req, res, next) {
    const singleBrandSize = req.params.brandSize;
    models.find({
      size: singleBrandSize
    }, function(err, singleSize) {
      if (err) {
        return next(err)
      }
      res.json(singleSize)
    })
  }

  function listSpecificBrandAndSize(req, res, next) {
    const singleBrandName = req.params.brandName;
    const singleBrandSize = req.params.brandSize;
    models.find({
      brand: singleBrandName,
      size: singleBrandSize
    }, function(err, brandAndSizeResult) {
      if (err) {
        return next(err)
      }
      res.send(brandAndSizeResult)
    })
  }

  function findOneAndUpdate(req, res, next) {
    const id = req.params.id;
    const in_stock = req.body.in_stock;
    models.findOneAndUpdate({
      _id: id
    }, {
      $inc: {
        in_stock: -in_stock
      }
    }, function(err, removedBrand) {
      if (err) {
        return next(err)
      }
      res.json(removedBrand)
    })
  }

  return {
    createBrands,
    displayAllBrandFunc,
    listSpecificBrandShoes,
    listSpecificBrandSize,
    listSpecificBrandAndSize,
    findOneAndUpdate
  }
}
