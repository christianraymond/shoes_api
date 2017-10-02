$(function() {
  var url = "http://localhost:3000/shoes";
  var shoesTable = document.getElementById("shoesTable").innerHTML;
  var compiledTable = Handlebars.compile(shoesTable);
  var showTable = document.getElementById("showTable");

  //Add new brands to the database using POST.
  $("#addBtn").on("click", function() {
    var brand = document.getElementById("inputBrand").value;
    var color = document.getElementById("inputColor").value;
    var size = document.getElementById("inputSize").value;
    var instock = document.getElementById("inputInstock").value;
    var price = document.getElementById("inputPrice").value;

    if(brand == null || brand.length == 0, color == null || color.length == 0, size == null || size.length == 0 || instock == null || instock.length == 0, price == null || price.length == 0) {
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
      type: "POST",
      data: stock,
      dataType: "aplication/json",
      url: url,
      success: function(data) {
        showTable.innerHTML = compiledTable({
          shoes: stock
        })
      },
      error: function(error) {
        alert("You will see the result!!")
      }
    })
  });
  //Get all brand from the database.
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      showTable.innerHTML = compiledTable({
        Shoes: data
      })
    },
    error: function(error) {
      alert("error")
    }
  });
});
