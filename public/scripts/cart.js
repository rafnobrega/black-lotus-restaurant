$(document).ready(function () {

  $("#pay-order-button").click(function () {
    if (Number($(".pay-order-subtotal").attr("data-value")) <= 0) {
      alert("You cart is empty. Please review it.");
      return;
    }
    let notes = $(".cart-notes").val();
    window.localStorage.setItem("notes", notes);

    setTimeout(function () {
      let actualDivDisplay = $(".spinning-lotus").css("display");
      let newDivDisplay = "";
      if (actualDivDisplay == "none") {
        newDivDisplay = "flex";
      } else {
        newDivDisplay = "none";
      }
      $(".spinning-lotus").css("display", newDivDisplay);
    }, 1000);

    setTimeout(function () {
      let actualDivDisplay = $(".payment-msg").css("display");
      let newDivDisplay = "";
      if (actualDivDisplay == "none") {
        newDivDisplay = "flex";
      } else {
        newDivDisplay = "none";
      }
      $(".payment-msg").css("display", newDivDisplay);
    }, 4500);
  });

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

