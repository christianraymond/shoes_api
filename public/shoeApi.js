$(function() {
  var url = "http://localhost:3000/shoes";
  var shoesTable = document.getElementById("shoesTable").innerHTML;
  var compiledTable = Handlebars.compile(shoesTable);
  var showTable = document.getElementById("showTable");

  //Add new brands to the database using POST.
  $("#addBtn").on("click", function() {
    var brand = document.getElementById("inputBrand");
    var color = document.getElementById("inputColor");
    var size = document.getElementById("inputSize");
    var instock = document.getElementById("inputInstock");
    var price = document.getElementById("inputPrice");

    var stock = {
      brand: brand.value,
      color: color.value,
      size: size.value,
      in_stock: instock.value,
      price: price.value,

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
