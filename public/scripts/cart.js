$(document).ready(function () {
    $("#review-order-button").on("click", function (event) {
       window.location.href = "/menu";
    });



  $("#pay-order-button").on("click", function (e) {
    e.preventDefault();
    let notes = $(".cart-notes").val();
    window.localStorage.setItem("notes", notes);


});

});

