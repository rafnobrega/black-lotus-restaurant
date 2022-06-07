
$(document).ready(() => {
  const loadOrders = function() {
    $.get('/admin?json=1')
      .then((orderData) => {
        renderOrders(orderData);
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
  <article class="posted-order">
  <header class="order-timestamp"> Time Created: ${order.timestamp} %>
   </header>

   <header>
    <div class="header-number"> Order Number: ${order.id}
    <div>Status: ${order.status} </div></div>
  </header>


  <div class="order-summary">
  <div>Customer Name: ${order.name} </div>
  <div> Customer Notes: ${order.notes} </div>
  </div>


  </article>`);

  return $order;
};


});
