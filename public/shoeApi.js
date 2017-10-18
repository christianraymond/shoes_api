$(function() {
  var shoesTable = document.getElementById("shoesTable").innerHTML;
  var compiledTable = Handlebars.compile(shoesTable);
  var showTable = document.getElementById("showTable");

  var brandTemp = document.getElementById("dropdownOutput").innerHTML;
  var brandAndsize = Handlebars.compile(brandTemp);
  var dropDowns = document.getElementById("filteredData");

  var dropdownsize = document.getElementById("dropdownSizeTemplate").innerHTML;
  var compilesize = Handlebars.compile(dropdownsize);
  var displaysize = document.getElementById("dropdownSize");

  //Get specific single brand dropdown values.
  $.ajax({
    type: "GET",
    url: "/shoes/filterDropdown",
    success: function(diplicate) {
      dropDowns.innerHTML = brandAndsize({
        brand: diplicate.uniqueBrand
      })
    },
    error: function() {
      alert("error")
    }
  });
  //Get specific single size dropdowns values.
  $.ajax({
    type: "GET",
    url: "/shoes/filterDropdown",
    success: function(sizediplicate) {
      displaysize.innerHTML = compilesize({
        size: sizediplicate.uniqueSize
      })
    },
    error: function() {
      alert("error")
    }
  })

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
          Shoes: data
        })
      },
      error: function(error) {
        return ("You about to see the result")
      }
    })
    //Ajax call to buy shoes
    $('#showInfo').on('click', function(e) {

      var table = document.getElementById("template").innerHTML;
      var theTemplate = Handlebars.compile(table);
      var shoeId = e.target.value;

      $.ajax({
        url: '/shoes/sold/' + shoeId,
        type: 'POST',
        dataType: 'application/json',
        success: function(data) {},
        error: function(error) {}
      })
    });


  });
  //Get all brand from the database.
  $.ajax({
    type: "GET",
    url: "/shoes",
    success: function(allShoes) {
      showTable.innerHTML = compiledTable({
        Shoes: allShoes
      })
    },
    error: function(error) {
      alert("All brands")
    }
  })

  $("#searchBtn").on("click", function() {
    var brandSize = document.querySelector('.brandSize').value;
    var brandName = document.querySelector('.brandName').value;

     if(brandName !== "" && brandSize !== ""){
       $.ajax({
         type: "GET",
         url: "shoes/brand/" + brandName + "/size/" + brandSize,
         success: function(filterBoth) {
           if(filterBoth.length === 0){
             showTable.innerHTML = "Query Not Found!"
           } else {
             showTable.innerHTML = compiledTable({
               Shoes: filterBoth
             })
           }
         }
        //  error:function(error){
        //    alert("Not FOund@")
        //  }
       })
     } else {

       $.ajax({
         type: "GET",
         url: "/shoes/brand/" + brandName,
         success: function(shoeName) {
           showTable.innerHTML = compiledTable({
             Shoes: shoeName
           })
         },
         // error:function(error){
         //   alert()
         // }
       })

       $.ajax({
         type: "GET",
         url: "/shoes/size/" + brandSize,
         success: function(sizeNum) {
           showTable.innerHTML = compiledTable({
             Shoes: sizeNum
           })
         },
         //  error: function(error){
         //   alert("error")
         // }
       })
     }

  })
})
