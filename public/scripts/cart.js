$(document).ready(function () {
    $("#review-order-button").on("click", function (event) {
      window.location.href = "/menu";
    });

  // // 🚫 "Pay my Order" button clears selections after the user pays for their order:
  //   window.localStorage.clear("summary");
  //   window.localStorage.clear("counterSubtotal");
  //   window.localStorage.clear("notes");
  //   $(".place-my-order-summary").html(``);
  //   $(".place-my-order-subtotal").text(`$ 0.00`);
  //   $(".cart-notes").val(``);
  //   $(".pay-order-subtotal").val(0);



});

