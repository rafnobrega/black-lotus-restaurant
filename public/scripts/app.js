// Client facing scripts here

$(document).ready(function () {
  let counterSubtotal = 0;

  $(".add-to-order").on("click", function () {
    $(".item-price").each(function (index) {
      const dishPrice = $(`.item-price.${index + 1}`).text().trim();
      const parsedDishPrice = dishPrice.slice(1);
      const dishQuantity = $(`.item-quantity.${index + 1}`).val();
      counterSubtotal += parsedDishPrice * dishQuantity;
      $(`.item-quantity.${index + 1}`).val(0);
    });
    $(".place-my-order-subtotal").text(`$ ${counterSubtotal}`);

    // const dishId = $(this).attr("class").split(" ")[1];
    // console.log("dishId:", dishId);
  });
});

$(function () {
  $("#item-quantity").change(function () {
    $(".place-my-order-subtotal").val(
      parseInt($(this).val()) * parseInt($("#obj.id").val())
    );
  });
});

