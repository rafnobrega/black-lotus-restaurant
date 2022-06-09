
$(document).ready(() => {
  const loadOrders = function() {
    $.get('/admin?json=1')
      .then((orderData) => {
        // console.log('orderData: ', orderData)
        renderOrders(orderData);
        $(".send-button").on("click", (e) => {
        e.preventDefault();
        $.post('/admin/checkout')
        $('.posted-order').remove()
      });
      });
  };

  const renderOrders = function(orders) {
    for (let order of orders) {
      // console.log('order:', order)
      let returnValue = createOrderElement(order);
      $('#order-container').append(returnValue);
    }
  };
  loadOrders()



const createOrderElement = function(order) {


  const $order = $(`
  <article class="posted-order">
  <header class="order-timestamp"> Time Created: ${order.timestamp}
   </header>

   <header>
    <div class="header-number"> Order Number: ${order.order__id}
    <div>Status: ${order.status} </div></div>
  </header>


  <div class="order-summary">
  <div>Customer Name: ${order.name} </div>
  <div> Customer Notes: ${order.notes} </div>
  </div>

  <div class="send-message">
  <button type="submit" class="send-button">Notify customer of order completion</button>
  </div>


  </article>`);

  return $order;
};


});
