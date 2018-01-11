var menu = document.querySelector(".main-nav");
var menu_btn = menu.querySelector(".main-nav__toggle");

menu.classList.add("main-nav--closed");
menu_btn.classList.remove("main-nav__toggle--nojs");
menu_btn.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.toggle("main-nav--closed");
})
