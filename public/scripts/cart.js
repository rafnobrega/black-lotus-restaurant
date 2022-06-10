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

      setTimeout(function () {
        window.location.replace("http://localhost:8080/profile");
      }, 8000);
  });



  $("#review-order-button").on("click", function (event) {
      window.location.href = "/menu";
    });
});

