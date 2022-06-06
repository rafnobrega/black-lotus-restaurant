// Client facing scripts here

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
      // console.log(string);
    }
    return string;
  }

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
      summary.push({quantity, dishTitle, price});
    }


    $(".place-my-order-summary").html(`${parseOrder(summary)}`);
    $(".place-my-order-subtotal").text(`$ ${counterSubtotal.toFixed(2)}`);
  });

  $("#place-my-order-button").on("click", function (event) {
  const setMenuCookie = function () {
    Cookies.set("menu order", JSON.stringify(summary));
  };
  setMenuCookie();
});
});
