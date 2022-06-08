$(document).ready(function () {

  $("#pay-order-button").on("click", (e) => {
    e.preventDefault();
    let summary = window.localStorage.getItem(('summary'));
    let price = window.localStorage.getItem(('counterSubtotal'));
    let notes = window.localStorage.getItem(('notes'));
    let parsedPrice = JSON.parse(price);
    let parsedSummary = JSON.parse(summary);
    $.post('/cart/new', {order: parsedSummary, price: parsedPrice, notes: notes});
  });
});
