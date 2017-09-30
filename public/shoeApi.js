$(function() {
  var url = "http://localhost:3000/shoes";
  var shoesTable = document.getElementById("shoesTable").innerHTML;
  var compiledTable = Handlebars.compile(shoesTable);
  var showTable = document.getElementById("showTable");

  //Add new brands to the database using POST.

  $("#addBtn".onclick, function(){
    var stock = {
      brand: $brand.val(),
      color: $color.val(),
      size: $size.val(),
      instock: $in_stock.val()
    }
    $.ajax({
      type: "POST",
      data: stock,
      dataType: "aplication/json",
      url: url,
      success: function(data){
        console.log("New shoes has been successfully added!");
      },
      error: function(error){
        alert("I getting an error message!")
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
