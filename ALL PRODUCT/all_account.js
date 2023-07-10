// TOGGLE MENU

const toggleMenu = document.querySelector(".toggle_menu");
const navMenu = document.querySelector(".nav_menu");

toggleMenu.addEventListener("click", mobileMenu);

function mobileMenu() {
  toggleMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav_link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  toggleMenu.classList.remove("active");
  navMenu.classList.remove("active");
}
