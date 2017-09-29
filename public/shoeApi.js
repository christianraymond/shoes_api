$(function() {
  alert('This is an alert');
  var shoesTable = document.getElementById("shoesTable").innerHTML;
  var compiledTable = Handlebars.compile(shoesTable);
  var showTable = document.getElementById("showTable");

  $.ajax({
    type: "get",
    url: "http://localhost:3000/shoes",
      success: function(data){
      showTable.innerHTML = compiledTable({
       allShoes: data
      })
    },
    error: function(error) {
      alert("This is an error")
    }
  });
});
