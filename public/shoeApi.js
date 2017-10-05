$(function() {
  var shoesTable = document.getElementById("shoesTable").innerHTML;
  var compiledTable = Handlebars.compile(shoesTable);
  var showTable = document.getElementById("showTable");

  //Filtering shoes by brandName,brandColor,brandSize.
  // var filteringData = document.getElementById("filteringData");
  // var filteredData = Handlebars.compile(filteringData);
  // var displayResult = document.getElementsByClassName('displayResult');

  //Add new brands to the database using POST.
  $("#addBtn").on("click", function() {
    var brand = document.getElementById("inputBrand").value;
    var color = document.getElementById("inputColor").value;
    var size = document.getElementById("inputSize").value;
    var instock = document.getElementById("inputInstock").value;
    var price = document.getElementById("inputPrice").value;

    if (brand == null || brand.length == 0, color == null || color.length == 0, size == null || size.length == 0 || instock == null || instock.length == 0, price == null || price.length == 0) {
      alert("Please fill all required fields")
      return false;
    }
    var stock = {
      brand: brand,
      color: color,
      size: size,
      in_stock: instock,
      price: price,

    }

    $.ajax({
      data: JSON.stringify(stock),
      dataType: "aplication/json",
      url: "http://localhost:3000/shoes",
      type: "POST",
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        showTable.innerHTML = compiledTable({
          shoes: stock
        })
      },
      error: function(error) {
        return ("You about to see the result")
      }
    })
  });
  //Get all brand from the database.
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/shoes",
    success: function(data) {
      showTable.innerHTML = compiledTable({
        Shoes: data
      })
    },
    error: function(error) {
      alert("Hello error")
    },
  });

    var uniQbrand = [];
    var uniQbrandMap = {};
  for (var x = 0; x < data.length; x++){
    var b = data[x].brand;
    if (uniQbrandMap[b] == undefined) {
      uniQbrandMap = b;
      uniQbrand.push(b)
    }
    var foundBrand = false;
  }
    var uniQcolor = [];
    var uniQcolorMap = {};

  for(x = 0; x < data.length; x++){
     var c = data[x].color;
     if (uniQcolorMap[c] == undefined) {
       uniQcolorMap = c;
       uniQcolor.push(c)
     }
     var foundColor = false;
  }

  var uniQsize = [];
  var uniQsizeMap = {};
    for(var x = 0; x < data.length; x++){
      var s = data[x].size;
      if(uniQsizeMap[s] == undefined){
        uniQsizeMap = s;
        uniQsize.push(s)
      }
    var sizeName = document.querySelector(".brandName");
    var compile = Handlebars.compile("sizeName");

    }
    var foundSize = false;

});
