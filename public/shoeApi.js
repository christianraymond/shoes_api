$(function() {
  var url = "http://localhost:3000/shoes"
  var shoesTable = document.getElementById("shoesTable").innerHTML;
  var compiledTable = Handlebars.compile(shoesTable);
  var showTable = document.getElementById("showTable");

  $.ajax({
    type: "get",
    url: url,
      success: function(data){
      showTable.innerHTML = compiledTable({
       Shoes: data
      })
    },
    error: function(error) {
      alert("error")
    }
  });
});
