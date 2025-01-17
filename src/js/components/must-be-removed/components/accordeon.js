const headers = document.querySelectorAll('[data-name="accordeon-title"]');
const contents = document.querySelectorAll(".list-content");

// headers.forEach(function (item) {
//   item.addEventListener('click', showContent);
// });

// function showContent() {
//   contents.forEach(function (item) {
//     if (!item.classList.contains('hidden')) {
//       item.classList.add('hidden');
//     }
//   });
//   this.nextElementSibling.classList.toggle('hidden');
// }

headers.forEach(function (item) {
  item.addEventListener("click", function () {
    if (!this.nextElementSibling.classList.contains("hidden")) {
      this.nextElementSibling.classList.add("hidden");
    } else {
      contents.forEach(function (item) {
        item.classList.add("hidden");
      });
      item.nextElementSibling.classList.remove("hidden");
    }
  });
});

// Max

// const accordions = document.querySelectorAll(".accordion");

// accordions.forEach((el) => {
//   el.addEventListener("click", (e) => {
    // self - элемент на который тыкнули (в данном случае <li></li>)
    // const self = e.currentTarget;
    // console.log(self);
    // console.log(e.target);

    // const control = self.querySelector(".accordion__control");
    // const content = self.querySelector(".accordion__content");

    // self.classList.toggle("open");

    // если открыт аккордеон
    // if (self.classList.contains("open")) {
    //   control.setAttribute("aria-expanded", true);
    //   content.setAttribute("aria-hidden", false);
      // меняем max-height (найти высоту блока, даже если он скрыт позволяет scrollHeight)
      // и для того чтобы паддинги нормально учитывались при определении высоты
      // используем для блока content box-sizing: content-box;
//       content.style.maxHeight = content.scrollHeight + "px";
//     } else {
//       control.setAttribute("aria-expanded", false);
//       content.setAttribute("aria-hidden", true);
//       content.style.maxHeight = null;
//     }
//   });
// });

// =================================================================================================
//                                                                                              John
// =================================================================================================
// Находим все аккордионы
const spollersArray = document.querySelectorAll("[data-spollers]");
//
if (spollersArray.length > 0) {
  // Получение обычных слойлеров
  // Этот фрагмент кода написан на JavaScript и выполняет фильтрацию массива spollersArray, чтобы создать новый массив spollersRegular, который содержит
  // только элементы, у которых отсутствует первое значение в атрибуте data-spollers (или оно пустое).

  // Разбор кода:
  // 1. Array.from(spollersArray)
  // Преобразует объектоподобный массив spollersArray (например, NodeList) в настоящий массив, чтобы можно было использовать методы массива, такие как filter.

  // 2. .filter(function (item, index, self) { ... })
  // Фильтрует элементы массива spollersArray, оставляя только те, которые соответствуют условию внутри функции.

  // 3. item.dataset.spollers
  // dataset предоставляет доступ к всем атрибутам data-* элемента. В данном случае это значение атрибута data-spollers.
  // 4. .split(",")[0]

  // Разделяет строку data-spollers по запятой и берет первое значение ([0]). Например:
  // Если data-spollers="123,456", то split(",") вернет ["123", "456"], а [0] даст "123".
  // Если data-spollers пустой, то результат будет пустой строкой "".

  // 5. return !item.dataset.spollers.split(",")[0]

  // Условие фильтрации:
  // Если первое значение (после split(",")) пустое (""), выражение !item.dataset.spollers.split(",")[0] вернет true, и элемент попадет в spollersRegular.
  // Если есть какое-либо значение, элемент исключается.
  // Что делает код в итоге:
  // Он создает массив spollersRegular, содержащий только те элементы из spollersArray, у которых:

  // Атрибут data-spollers существует, но его первое значение пустое или отсутствует.
  const spollersRegular = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return !item.dataset.spollers.split(",")[0];
  });
  // Инициализация обычных слойлеров
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  // Получение слойлеров с медиа запросами
  const spollersMedia = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return item.dataset.spollers.split(",")[0];
  });

  // Инициализация слойлеров с медиа запросами
  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    // Получаем уникальные брейкпоинты
    let mediaQueries = breakpointsArray.map(function (item) {
      return (
        "(" +
        item.type +
        "-width: " +
        item.value +
        "px)," +
        item.value +
        "," +
        item.type
      );
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    // Работаем с каждым брейкпоинтом
    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      // Объекты с нужными условиями
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      // Событие
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }

  // Инициализация
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add("_init");
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener("click", setSpollerAction);
      } else {
        spollersBlock.classList.remove("_init");
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }

  // Работа с контентом
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute("tabindex");
          if (!spollerTitle.classList.contains("_active")) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute("tabindex", "-1");
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }

  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
      const spollerTitle = el.hasAttribute("data-spoller")
        ? el
        : el.closest("[data-spoller]");
      const spollersBlock = spollerTitle.closest("[data-spollers]");
      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
        ? true
        : false;
      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_active")) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle("_active");
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }

  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector(
      "[data-spoller]._active"
    );
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove("_active");
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}

//===============================================================================
//SlideToggle
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("height");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};

let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};

//======================================================================================
/*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/


class GraphAccordion {
  constructor(selector, options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
      speed: 300,
    };

    this.options = Object.assign(defaultOptions, options);
    this.accordion = document.querySelector(selector);
    this.control = this.accordion.querySelector('.accordion__control');
    this.content = this.accordion.querySelector('.accordion__content');
    this.event();
  }

  event() {
    console.log('event!');

    if (this.accordion) {
      this.accordion.addEventListener('click', (e) => {
        this.accordion.classList.toggle('open');

        if (this.accordion.classList.contains('open')) {
          this.open();
        } else {
          this.close();
        }
      });
    }
  }

  open() {
    this.accordion.style.setProperty(
      '--accordion-time',
      `${this.options.speed / 1000}s`
    );
    this.accordion.classList.add('is-open');
    this.control.setAttribute('aria-expanded', true);
    this.content.setAttribute('aria-hidden', false);
    this.content.style.maxHeight = this.content.scrollHeight + 'px';
    this.options.isOpen(this);
  }

  close() {
    this.accordion.classList.remove('is-open');
    this.control.setAttribute('aria-expanded', false);
    this.content.setAttribute('aria-hidden', true);
    this.content.style.maxHeight = null;
    this.options.isClose(this);
  }
}

const accordion1 = new GraphAccordion('.accordion-1', {
	speed: 500,
	isOpen: (acc) => {
		console.log(acc);
	},
	isClose: (acc) => {
		console.log(acc);
	}
});

const accordion2 = new GraphAccordion('.accordion-2', {
	speed: 1500
});