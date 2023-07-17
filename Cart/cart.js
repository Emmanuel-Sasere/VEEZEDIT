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
    ).innerText;
    itemList = itemList.filter((el) => el.title !== title);
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
  const title = product.querySelector(".product_name").innerText;
  const price = product.querySelector(".product_price").innerText;
  const img = product.querySelector(".product_img");
  const imgSrc = img ? img.src : "../Assests/H1.webp";

  const newProduct = { title, price, imgSrc };

  if (itemList.find((el) => el.title === newProduct.title)) {
    alert("Product already added to cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  const newProductElement = createCartProduct(title, price, imgSrc);
  const cartBasket = document.querySelector(".cart-content");
  cartBasket.insertAdjacentHTML("beforeend", newProductElement);
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

  cartItems.forEach((product) => {
    const priceElement = product.querySelector(".cart-price");
    const price = parseFloat(
      priceElement.innerText.replace("₦", "").replace(",", "")
    );
    const qty = product.querySelector(".cart-quantity").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText = `₦${(price * qty).toFixed(
      2
    )}`;
  });

  totalValue.innerText = `₦${total.toFixed(2)}`;

  const cartCount = document.querySelector(".my-cart-badge");
  const count = itemList.length;
  cartCount.innerText = count;

  cartCount.style.display = count > 0 ? "block" : "none";
}
