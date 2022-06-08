$(document).ready(function () {

 $("#pay-order-button").on("click", (e) => {
       /////get info from local storage
       //////make $ request here using jquery
       ///////3) jquery $.AJAX (inside post)
       e.preventDefault();
       let summary = window.localStorage.getItem(('summary'));
       let price = window.localStorage.getItem(('counterSubtotal'))
       let parsedPrice = JSON.parse(price)
       let parsedSummary = JSON.parse(summary);

       console.log('parsed: summary:', parsedSummary);
       console.log('parsed price', parsedPrice)

       $.post('/cart/new', {order: parsedSummary, price: parsedPrice})

      //

    })

});
