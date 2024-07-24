import { disableScroll } from '../functions/disable-scroll.js';
import { enableScroll } from '../functions/enable-scroll.js';

const burgerBtn = document.querySelector('[data-burger]');
const burgerMenu = document.querySelector('[data-menu]');
const burgerMenuItems = document.querySelector('[data-menu-item]');

burgerBtn.addEventListener("click", function () {
  burgerBtn.classList.toggle("burger-btn--active");
  burgerMenu.classList.toggle("nav--active");
});

