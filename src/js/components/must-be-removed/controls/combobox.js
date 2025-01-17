const elements = {
  combobox: document.querySelector("[data-combobox]"),
  button: document.querySelector('[role="combobox"]'),
  dropdown: document.querySelector('[role="listbox"]'),
  options: document.querySelectorAll('[role="option"]'), // add the options elements
};

let isDropdownOpen = false;
let currentOptionIndex = 0;
let lastTypedChar = "";
let lastMatchingIndex = 0;

const toggleDropdown = () => {
  elements.dropdown.classList.toggle("active");
  elements.combobox.classList.toggle("open");
  isDropdownOpen = !isDropdownOpen;
  elements.button.setAttribute("aria-expanded", isDropdownOpen.toString());

  if (isDropdownOpen) {
    focusCurrentOption();
  } else {
    elements.button.focus(); // focus the button when the dropdown is closed just like the select element
  }
};

const focusCurrentOption = () => {
  const currentOption = elements.options[currentOptionIndex];

  currentOption.classList.add("current");
  currentOption.focus();

  currentOption.scrollIntoView({
    block: "nearest",
  });

  elements.options.forEach((option, index) => {
    if (option !== currentOption) {
      option.classList.remove("current");
    }
  });
};

const handleKeyPress = (event) => {
  event.preventDefault();
  const { key } = event;
  const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "];

  if (!isDropdownOpen && openKeys.includes(key)) {
    toggleDropdown();
  } else if (isDropdownOpen) {
    switch (key) {
      case "Escape":
        toggleDropdown();
        break;
      case "ArrowDown":
        moveFocusDown();
        break;
      case "ArrowUp":
        moveFocusUp();
        break;
      case "Enter":
      case " ":
        selectCurrentOption();
        break;
      default:
        // Handle alphanumeric key presses for mini-search
        handleAlphanumericKeyPress(key);
        break;
    }
  }
};

const handleDocumentInteraction = (event) => {
  const isClickInsideButton = elements.button.contains(event.target);
  const isClickInsideDropdown = elements.dropdown.contains(event.target);

  if (isClickInsideButton || (!isClickInsideDropdown && isDropdownOpen)) {
    toggleDropdown();
  }

  // Check if the click is on an option
  const clickedOption = event.target.closest('[role="option"]');
  if (clickedOption) {
    selectOptionByElement(clickedOption);
  }
};

const moveFocusDown = () => {
  if (currentOptionIndex < elements.options.length - 1) {
    currentOptionIndex++;
  } else {
    currentOptionIndex = 0;
  }
  focusCurrentOption();
};

const moveFocusUp = () => {
  if (currentOptionIndex > 0) {
    currentOptionIndex--;
  } else {
    currentOptionIndex = elements.options.length - 1;
  }
  focusCurrentOption();
};

const selectCurrentOption = () => {
  const selectedOption = elements.options[currentOptionIndex];
  selectOptionByElement(selectedOption);
};

const selectOptionByElement = (optionElement) => {
  const optionValue = optionElement.textContent;

  elements.button.textContent = optionValue;
  elements.options.forEach((option) => {
    option.classList.remove("active");
    option.setAttribute("aria-selected", "false");
  });

  optionElement.classList.add("active");
  optionElement.setAttribute("aria-selected", "true");

  toggleDropdown();
};

const handleAlphanumericKeyPress = (key) => {
  const typedChar = key.toLowerCase();

  if (lastTypedChar !== typedChar) {
    lastMatchingIndex = 0;
  }

  const matchingOptions = Array.from(elements.options).filter((option) =>
    option.textContent.toLowerCase().startsWith(typedChar)
  );

  if (matchingOptions.length) {
    if (lastMatchingIndex === matchingOptions.length) {
      lastMatchingIndex = 0;
    }
    let value = matchingOptions[lastMatchingIndex];
    const index = Array.from(elements.options).indexOf(value);
    currentOptionIndex = index;
    focusCurrentOption();
    lastMatchingIndex += 1;
  }
  lastTypedChar = typedChar;
};

elements.button.addEventListener("keydown", handleKeyPress);
document.addEventListener("click", handleDocumentInteraction);
