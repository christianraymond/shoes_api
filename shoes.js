'use strict';
module.exports = function(models) {

  const createBrands = function(req, res, next) {
    const newshoes = req.body;
    models.create({
      brand: newshoes.brand,
      color: newshoes.color,
      size: Number(newshoes.size),
      price: Number(newshoes.price),
      in_stock: Number(newshoes.in_stock),
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

  function dropdownOutput(req, res, next) {
    models.find({}, function(err, result) {
        if(err){
          return next(err)
        }else {

      var uniqueBrand = [];
      var mapBrand = {};

      for (var x = 0; x < result.length; x++) {
        var brandName = result[x];
        if (mapBrand[brandName.brand] === undefined) {
          mapBrand[brandName.brand] = brandName.brand;
          uniqueBrand.push(
          brandName.brand
          );
        }
      }
      var uniqueSize = [];
      var mapSize = {};

      for (var i = 0; i < result.length; i++) {
        var brandSize = result[i];
        if (mapSize[brandSize.size] === undefined) {
          mapSize[brandSize.size] = brandSize.size;
          uniqueSize.push(brandSize.size);
        }
        res.json(result)
      }
      }

      // return uniqueSize.sort(function(s1, s2) {
      //   if (s1.size < s2.size) {
      //     return -1
      //   }
      //   if (s1.size > s2.size) {
      //     return 1
      //   }
      //   return 0;
      // })
    })
  }

  function findOneAndUpdate(req, res, next) {
    const id = req.params.id;
    const amount = req.params.amount;
    models.findOneAndUpdate({
      _id: id
    }, {
      $inc: {
        in_stock: -amount
      }
    }, function(err, result) {
      if (err) {
        return next(err)
      }
      res.send(result)
    });
    console.log('Sold a shoe!');
    if (result.in_stock < 1) {
      result.remove(function(err, check) {
        if (err) {
          return next(err)
        }
        console.log(check.brand + ' size ' + check.size + ', ' + check.color + ' is sold out!');
      })
    }
    res.send(result.brand + ' size ' + result.size + ', ' + result.color + 'have been sold for R' + result.price + '. Avail in store: ' + result.in_stock);
  }

  function addNewShoeToStock(req, res, next) {
    const id = req.params.id;
    const amount = req.params.amount;
    models.findOneAndUpdate({
      _id: id
    }, {
      $inc: {
        in_stock: amount
      }
    }, function(err, result) {
      if (err) {
        return next(err)
      }
      res.send(result)
    })
  }

  return {
    createBrands,
    displayAllBrandFunc,
    listSpecificBrandShoes,
    listSpecificBrandSize,
    listSpecificBrandAndSize,
    findOneAndUpdate,
    addNewShoeToStock,
    dropdownOutput
  }
}
