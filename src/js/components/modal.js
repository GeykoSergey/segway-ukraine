import { disableScroll } from "../functions/disable-scroll.js";
import { enableScroll } from "../functions/enable-scroll.js";

const openModalBtns = document.querySelectorAll("[data-modal-btn-open]");
const closeModalBtns = document.querySelectorAll("[data-modal-btn-close]");
const allModalWindows = document.querySelectorAll("[data-modal]");

if (openModalBtns.length > 0 && allModalWindows.length > 0) {
  openModalBtns.forEach(function (element) {
    element.addEventListener("click", function () {
      disableScroll();
      const modalId = this.dataset.modalBtnOpen;
      const modal = document.querySelector("#" + modalId);

      modal.classList.remove("modal-hidden");

      modal
        .querySelector(".modal__window")
        .addEventListener("click", function (event) {
          event.stopPropagation();
        });
    });
  });

  closeModalBtns.forEach(function (element) {
    element.addEventListener("click", function () {
      const currentModal = this.closest("[data-modal]");
      currentModal.classList.add("modal-hidden");
      enableScroll();
    });
  });

  allModalWindows.forEach(function (element) {
    element.addEventListener("click", function () {
      this.classList.add("modal-hidden");
      enableScroll();
    });
  });
}
