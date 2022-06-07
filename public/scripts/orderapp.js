const loadOrders = function() {
  $.get('/admin')
    .then((orderData) => {
      renderOrders(orderData);
    });
};

$(document).ready(() => {

  const renderOrders = function(orders) {
    for (let order of orders) {
      let returnValue = createTweetElement(order);
      $('#tweets-container').prepend(returnValue);
    }
  };
});


const createOrderElement = function(tweet) {


  const $tweet = $(`<article class="posted-tweet">
                      <header class="tweet-header">
                          <div class="name"><img src="${tweet.user.avatars}">${tweet.user.name} </div>
                          <div class="handle">${tweet.user.handle}</div>
                      </header>
                      <p class="text"> ${escape(tweet.content.text)}</p>
                      <footer class="tweet-footer">
                          <div class="time-created">${timeago.format(tweet.created_at)}</div>
                          <div> <i class="fa-solid fa-flag flag"></i> <i class="fa-solid fa-retweet retweet"></i> <i class="fa-solid fa-heart heart"></i> </div>
                      </footer>
                    </article>`);

  return $tweet;
};
