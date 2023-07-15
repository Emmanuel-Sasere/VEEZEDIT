const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnClose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadProducts);

function loadProducts() {
  const products = [
    {
      title: "Foil Business Card",
      price: "37,700",
      imgSrc: "../Assests/H1.webp",
    },
    {
      title: "Product 2",
      price: "Price 2",
      imgSrc: "image2.jpg",
    },
    // Add more products here
  ];

  loadContent(products);
  itemList = getCartItems();
  displayCartItems();
  updateCartIcon();
}

function loadContent(products) {
  const cartBtns = document.querySelectorAll(".add_cart");
  cartBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => addCart(products[index]));
  });
}

function removeItem() {
  if (confirm("Are you sure you want to remove this item?")) {
    const title = this.parentElement.querySelector(
      ".cart-product-title"
    ).innerHTML;
    itemList = itemList.filter((el) => el.title !== title);
    this.parentElement.remove();
    updateTotal();
    saveCartItems();
    updateCartIcon();
  }
}

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  updateTotal();
  saveCartItems();
}

let itemList = [];

function addCart(product) {
  const { title, price, imgSrc } = product;

  const newProduct = { title, price, imgSrc };

  if (itemList.find((el) => el.title === newProduct.title)) {
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
  updateTotal();
  saveCartItems();
  updateCartIcon();
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
      priceElement.innerHTML.replace("₦", "").replace(",", "")
    );
    const qty = product.querySelector(".cart-quantity").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText =
      "₦" + (price * qty).toFixed(2);
  });

  totalValue.innerHTML = "₦" + total.toFixed(2);
}

function saveCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(itemList));
}

function getCartItems() {
  const storedItems = localStorage.getItem("cartItems");
  return storedItems ? JSON.parse(storedItems) : [];
}

function displayCartItems() {
  const cartBasket = document.querySelector(".cart-content");
  cartBasket.innerHTML = "";
  itemList.forEach((product) => {
    const { title, price, imgSrc } = product;
    const newProductElement = createCartProduct(title, price, imgSrc);
    const element = document.createElement("div");
    element.innerHTML = newProductElement;
    const removeBtn = element.querySelector(".cart-remove");
    removeBtn.addEventListener("click", removeItem);
    cartBasket.append(element);
  });
}

function updateCartIcon() {
  const cartIcon = document.querySelector("#cart-icon");
  const cartCount = document.querySelector(".my-cart-badge");
  const count = itemList.length;
  cartCount.innerHTML = count;
  cartCount.style.display = count > 0 ? "block" : "none";
  cartIcon.classList.toggle("cart-has-items", count > 0);
}
