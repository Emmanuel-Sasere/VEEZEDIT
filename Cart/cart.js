const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnClose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadProduct);

function loadProduct() {
  loadContent();
}

function loadContent() {
  const btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  const qtyElements = document.querySelectorAll(".cart-quantity");
  qtyElements.forEach((input) => {
    input.addEventListener("change", changeQty);
  });

  const cartBtns = document.querySelectorAll(".add_cart");
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addCart);
  });

  updateTotal();
}

function removeItem() {
  if (confirm("Are you sure you want to remove this item?")) {
    const title = this.parentElement.querySelector(
      ".cart-product-title"
    ).innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

function addCart() {
  const product = this.parentElement;
  const title = product.querySelector(".product_name").innerHTML;
  const price = product.querySelector(".product_price").innerHTML;
  const imgSrc = product.querySelector("#product-img");

  const newProduct = { title, price, imgSrc };

  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product already added to cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  const newProductElement = createCartProduct(title, price, imgSrc);
  const element = document.createElement("div");
  element.innerHTML = newProductElement;
  const cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="bx bxs-trash cart-remove" name="trash"></i>
    </div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll(".cart-box");
  const totalValue = document.querySelector(".total-price");

  let total = 0;

  cartItems.forEach((products) => {
    const priceElement = products.querySelector(".cart-price");
    const price = parseFloat(
      priceElement.innerHTML.replace("₦", "").replace(",", "")
    );
    const qty = products.querySelector(".cart-quantity").value;
    total += price * qty;
    products.querySelector(".cart-amt").innerText =
      "₦" + (price * qty).toFixed(2);
  });

  totalValue.innerHTML = "₦" + total.toFixed(2);

  const cartCount = document.querySelector(".my-cart-badge");
  const count = itemList.length;
  cartCount.innerHTML = count;

  cartCount.style.display = count > 0 ? "block" : "none";
}
