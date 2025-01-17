import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Scrollbar]);
const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});