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
  });

  // Set cookie when the "Review my order" button is clicked:
  $("#place-my-order-button").on("click", function (event) {
    const setMenuCookie = function () {
      Cookies.set("summary", JSON.stringify(summary));
    };
    setMenuCookie();
  });

  // Test if cookie is getting logged:
  let summaryCookie = Cookies.get("summary");
  let parsedSummaryCookie = JSON.parse(summaryCookie);
  console.log(parsedSummaryCookie);
});


  //   // Tentative of rendering the summary on the Cart page:
  //     const renderSummary = function (summary) {
  //     for (let item of summary) {
  //       let returnValue = createSummaryElement(summary);
  //       $(".pay-order-summary-item").append(returnValue);
  //     }
  //     };
  //     renderSummary();

  //   const createSummaryElement = function (summary) {
  //     const $summary = $(`<p>${summary.quantity}x ${summary.dishTitle} $${summary.price} <br>`);
  //   return $summary;
  //   };

