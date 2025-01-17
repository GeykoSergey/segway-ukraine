const productCardImg = document.querySelector(".product-card__img");
const swapColorBtn = document.querySelectorAll(".swap-color__input");

swapColorBtn.forEach((el) => {
  el.addEventListener("change", function () {
    console.log(el);
    let currentSrc = el.dataset.srcImg;
    productCardImg.src = currentSrc;
  });
});