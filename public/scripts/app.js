// Client facing scripts here

// MENU PAGE:
$(document).ready(function () {
  let dishTitle = "";
  let quantity = 0;
  let price = 0;
  let counterSubtotal = JSON.parse(window.localStorage.getItem("counterSubtotal")) || 0;
  let summary = JSON.parse(window.localStorage.getItem("summary")) || [];

  const parseOrder = (summary) => {
    let string = "";
    for (const item of summary) {
      string += `${item.quantity}x ${item.dishTitle} $${item.price} <br>`;
    }
    return string;
  };

  // Re-render the summary and subtotal if the user goes back to the Menu page:
  $(".place-my-order-summary").html(`${parseOrder(summary)}`);
  $(".place-my-order-subtotal").text(`$ ${counterSubtotal.toFixed(2)}`);


  // "Add to Order" button functionality:
  $(".add-to-order").on("click", function (event) {
    const $parent = $(event.target).parent();
    price = $parent.find(".item-price").text().trim().slice(1);
    quantity = Number($parent.find(".item-quantity").val());
    dishTitle = $parent.parent().find(".dish-title").text().trim();

    counterSubtotal += price * quantity;

    // Set the value of the quantity selector back to 1 unit:
    $parent.find(".item-quantity").val(1);

    // Check if item line already exists in the summary list add/update it:
    let itemFound = false;
    for (const obj of summary) {
      if (obj.dishTitle === dishTitle) {
        itemFound = true;
        obj.quantity += quantity;
      }
    }
    if (!itemFound) {
      summary.push({ quantity, dishTitle, price });
    }

    // Add item line in the summary:
    $(".place-my-order-summary").html(`${parseOrder(summary)}`);
    // Add price to the subtotal:
    $(".place-my-order-subtotal").text(`$ ${counterSubtotal.toFixed(2)}`);

    // Set the localStorage with the summary of items selected:
    $("#place-my-order-button").on("click", function (event) {
      // event.preventDefault();
      const setCartItems = function () {
        let stringifiedSummary = JSON.stringify(summary);
         window.localStorage.setItem("summary", stringifiedSummary);
      };
      setCartItems();

            const setSubtotal = function () {
              let stringifiedSubtotal = JSON.stringify(counterSubtotal);
              window.localStorage.setItem("counterSubtotal", stringifiedSubtotal);
            };
            setSubtotal();

    });




  });
});
