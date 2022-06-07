// Client facing scripts here

// MENU PAGE:
$(document).ready(function () {
  let counterSubtotal = 0;
  let dishTitle = "";
  let quantity = 0;
  let price = 0;
  let summary = [];

  const parseOrder = (summary) => {
    let string = "";
    for (const item of summary) {
      string += `${item.quantity}x ${item.dishTitle} $${item.price} <br>`;
    }
    return string;
  };

  $(".add-to-order").on("click", function (event) {
    const $parent = $(event.target).parent();
    price = $parent.find(".item-price").text().trim().slice(1);
    quantity = Number($parent.find(".item-quantity").val());
    dishTitle = $parent.parent().find(".dish-title").text().trim();

    counterSubtotal += price * quantity;

    $parent.find(".item-quantity").val(1);

    let itemFound = false; // flag
    for (const obj of summary) {
      if (obj.dishTitle === dishTitle) {
        itemFound = true;
        obj.quantity += quantity;
      }
    }
    if (!itemFound) {
      summary.push({ quantity, dishTitle, price });
    }

    $(".place-my-order-summary").html(`${parseOrder(summary)}`);
    $(".place-my-order-subtotal").text(`$ ${counterSubtotal.toFixed(2)}`);
  });

  // Sets cookie when the "Review my order" button is clicked:
  $("#place-my-order-button").on("click", function (event) {
    const setMenuCookie = function () {
      Cookies.set("summary", JSON.stringify(summary));
    };
    setMenuCookie();
  });



  let myCookie = Cookies.get("summary");
  let parsedMyCookie = JSON.parse(myCookie);
  console.log(parsedMyCookie[0]);



});






// $("#place-my-order-button").on("click", function (event) {
//   const populateCart = function () {
//     let $newItem = $(`
//     <p>Hello</p>
//     `);
//     return $newItem;
//   };
//   const renderCart = function (items) {
//     let container = $(".pay-order-summary-item");
//     container.empty();
//     for (let item of items) {
//       let $newItem = populateCart(item);
//       container.prepend($newItem);
//     }
//   };
//   renderCart();
// });
