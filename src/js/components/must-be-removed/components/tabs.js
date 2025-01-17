// =================================
// Max
// =================================

// document.addEventListener("DOMContentLoaded", function () {
//   const tabs = document.querySelectorAll(".tabs");

//   if (tabs.length > 0) {
//     tabs.forEach(function (element) {
//       element.addEventListener("click", function (event) {
//         if (event.target.classList.contains("tabs__btn")) {
//           const currentTabs = event.target.closest(".tabs");
//           const path = event.target.dataset.tabsPath;
//           tabHandler(path, currentTabs);
//         }
//       });
//     });
//   }

//   const tabHandler = function (path, currentTabs) {
//     const tabsBtns = currentTabs.querySelectorAll(".tabs__btn");
//     const tabsContents = currentTabs.querySelectorAll(".tabs__content");

//     tabsBtns.forEach(function (element) {
//       element.classList.remove("tabs__btn--active");
//     });

//     currentTabs
//       .querySelector(`[data-tabs-path="${path}"]`)
//       .classList.add("tabs__btn--active");

//     tabsContents.forEach(function (element) {
//       element.classList.remove("tabs__content--active");
//     });

//     currentTabs
//     .querySelector(`[data-tabs-target="${path}"]`)
//     .classList.add("tabs__content--active");
//   };
// });

// ======================================================================

// const tabButtons = document.querySelectorAll('[data-tab]');

// tabButtons.forEach(function (element) {
//   element.addEventListener('click', function () {
//     const currentTab = this.closest('.tabs');
//     const currentTabBtn = this.dataset.tab;

//     const tabContents = currentTab.querySelectorAll('[data-tab-content]');

//     tabContents.forEach(function (item) {
//       item.classList.add('hidden');
//     });

//     const tabContent = currentTab.querySelector(
//       `[data-tab-content=${currentTabBtn}]`
//     );

//     tabContent.classList.remove('hidden');
//   });
// });

// const component = document.querySelector('.componentSelector');

// ===============================================
// Рабочие табы
// ===============================================

const tabButtons = document.querySelectorAll("[data-tab-control]");

tabButtons.forEach(function (element) {
  element.addEventListener("click", function () {
    const currentTab = this.closest(".tabs");
    const currentTabBtn = this.dataset.tabControl;
    const tabContents = currentTab.querySelectorAll("[data-tab-content]");

    tabContents.forEach(function (item) {
      item.classList.add("hidden");
    });

    const tabContent = currentTab.querySelector(
      `[data-tab-content=${currentTabBtn}]`
    );

    tabContent.classList.remove("hidden");
  });
});

// Находим кнопки всех табов [data-tab-control]
// На них слушатель
// Ищем родителя клацнутой кнопки .tabs

// Tab controls
// tab control area
// tab control text