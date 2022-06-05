// Client facing scripts here

$(document).ready(function() {
  $("#add-to-order").on("click", function() {
    console.log("add to order CLICK ====");
  })

  $(".item-price").each(function (index) {
    console.log("INDEX:", index + "\n  PRICE:" + $(this).text());
  });

  // $(".item-quantity").val()(function (quantity) {
  //   console.log("QUANTITY: ", quantity + $(this).text());
  // });


$(".item-quantity")
let id = $(this).attr(".item-quantity")
  .keyup(function() {
    var value = $( this ).val();
    $("RAF WAS HERE", id).text( value );
  })
  .keyup();



});

$(function () {
  $("#item-quantity").change(function () {
    $(".place-my-order-subtotal").val(
      parseInt($(this).val()) * parseInt($("#obj.id").val())
    );
  });
});



// $document.ready(function () {
//  $
// });

// calculate the subtotal of my order
// iterate over each menu item
  // calculate price vs quantity
// sum the iterations


// how we access the values of each menu item

