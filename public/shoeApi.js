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

    if (brand == null || brand.length == 0 || color == null || color.length == 0 || size == null || size.length == 0 || instock == null || instock.length == 0 || price == null || price.length == 0) {
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
      url: "/shoes",
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
  function allshoes(){
  $.ajax({
    type: "GET",
    url: "/shoes",
    success: function(data) {
      showTable.innerHTML = compiledTable({
        Shoes: data
      })
    },
    error: function(error) {
      alert("Hello error")
    },
  })
  };

function filterDropdown(){
 var brand = document.querySelector(".brandName").value;
  $.ajax({
  type: "GET",
  url: "/shoes/filterDropdown",
  success: function(result){
    filteredData.innerHTML = compiledTable({
      // brand: result.brand.sort(),
      // size: result.size.sort(function(a, b){
      //   return a - b
      // })
    })
    }
  })
}
  //Filter shoes by brandByName
  function filterbrand(branName){
    $.ajax({
      type: "GET",
      url: "/shoes/brand " + branName,
      success:function(brand){
        dontshownow.innerHTML = compiledTable({
          shoes: brand
        })
      },
      error: function(error){
        alert('error')
      }
    })
  }
  //Filter shoes by brandsize
  function filtersize(brandSize){
    $.ajax({
      type: "GET",
      url: "/shoes/size" + brandSize,
      success:function(size){
        showTable.innerHTML = compiledTable({
          shoes: size
        })
      },
      error: function(error){
        alert("error")
      }
    })
  }
//Filter brandAndsize
function brandAndsize(brandName, brandSize){
  $.ajax({
    type: "GET",
    url: "/shoes/brand " + brandName + "/size" + brandSize,
    success: function(data){
      showTable.innerHTML = compiledTable({
        shoes: data
      });
    }
  });
 }
 filterDropdown();
 allshoes()
 $("#searchBtn").on("click", function(){

 })
})
