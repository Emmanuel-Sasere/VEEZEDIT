$(function () {
  var goToCartIcon = function ($addToCartBtn) {
    var $cartIcon = $("my-cart-icon");
    var $image = $(
      '<img width="30px" height="30px" src="' +
        $addToCartBtn.data("image") +
        '"/>'
    ).css({ position: "fixed", "z-index": "999" });

    $addToCartBtn.prepend($image);
    var position = $cartIcon.position();
    $image.animate(
      {
        top: position.top,
        left: position.left,
      },
      500,
      "linear",
      function () {
        $image.remove();
      }
    );
  };

  $(".my-cart-btn").mycart({
    classCartIcon: "my-cart-icon",
    classCartBadge: "my-cart-badge",
    affixCartIcon: true,
    checkoutCart: function (products) {
      $.each(products, function () {
        console.log(this);
      });
    },

    clickOnAddToCart: function ($addToCart) {
      goToCartIcon($addToCart);
    },
    getDiscountPrice: function (products) {
      var total = 0;
      $.each(products, function () {
        total += this.quantity * this.price;
      });
      return total * 0.5;
    },
  });
});

// classCartIcon:'my-cart-icon',
// classCartBadge:'my-cart-badge',
// classProductQuantity:'my-product-quantity',
// classProductRemove:'my-product-remove',
// classCheckoutCart:'my-cart-checkout',
// affixCartIcon:true,
// showCheckout<a href="https://www.jqueryscript.net/tags.php?/Modal/">Modal</a>:true,
// clickOnAddToCart:function($addTocart) { },
// clickOnCartIcon:function($cartIcon, products, totalPrice, totalQuantity) { },
// checkoutCart:function(products, totalPrice, totalQuantity) { },
// getDiscountPrice:function(products, totalPrice, totalQuantity) {return null; }
