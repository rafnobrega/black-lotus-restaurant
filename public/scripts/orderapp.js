
$(document).ready(() => {
  const loadOrders = function() {
    $.get('/admin?json=1')
      .then((orderData) => {
        renderOrders(orderData);

        $(".send-button").on("click", function(e) {
          e.preventDefault();
          $.post('/admin/checkout')
          const order =$( this )
          .closest( '[data-order-id]')
          .remove()
        });
      });
  };

  const renderOrders = function(orders) {
    for (let order of orders) {
      let returnValue = createOrderElement(order);
      $('#order-container').append(returnValue);
    }
  };
  loadOrders()



const createOrderElement = function(order) {


  const $order = $(`
  <article class="posted-order" data-order-id="${order.order__id}">
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
  <button type="button" class="send-button">Notify customer of order completion</button>
  </div>


  </article>`);

  return $order;
};


});
