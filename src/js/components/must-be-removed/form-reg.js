console.log("Reg Form!!!");

// Доступ к форме можно получить через значение атрибута name
// <form name="regForm">
const regForm = document.forms.regForm;


// Доступ к полю формы можно также получить через значение атрибута name firstname
// <input type="text" name="firstname" placeholder="Иван" />

const firstnameField = regForm.firstname;
const lastnameField = regForm.lastname;
const emailField = regForm.email;
const passwordField = regForm.password;
const regFormModal = document.getElementById('modal');

const containsOnlyCyrillicLatters = (string) => {
  return /^[а-я]+$/i.test(string);
};

// Валидация будет происходить при отправке формы
// при нажатии <button>Зарегистрироваться</button>

regForm.addEventListener("submit", (e) => {
  // Отменяем перезагрузку страницы при 'submit'
  e.preventDefault();

  // firstname validation
  const firstnameErrorMessages = firstnameField.parentElement.children;
  const firstnameFieldValue = firstnameField.value;

  if (firstnameFieldValue.length >= 3) {
    firstnameErrorMessages.namedItem("length").style.display = 'none';
  } else {
    firstnameErrorMessages.namedItem("length").style.display = 'block';
  }

  // if (/^[а-я]+$/i.test(firstnameFieldValue)) {
  //   firstnameErrorMessages.namedItem("alphabet").style.display = 'none';
  // } else {
  //   firstnameErrorMessages.namedItem("alphabet").style.display = 'block';
  // }

  if (containsOnlyCyrillicLatters(firstnameFieldValue)) {
    firstnameErrorMessages.namedItem("alphabet").style.display = 'none';
  } else {
    firstnameErrorMessages.namedItem("alphabet").style.display = 'block';
  }

  // flasstname validation
  const lastnameErrorMessages = lastnameField.parentElement.children;
  const lastnameFieldValue = lastnameField.value;

  if (lastnameFieldValue.length >= 4) {
    lastnameErrorMessages.namedItem("length").style.display = 'none';
  } else {
    lastnameErrorMessages.namedItem("length").style.display = 'block';
  }

  if (/^[а-я]+$/i.test(lastnameFieldValue)) {
    lastnameErrorMessages.namedItem("alphabet").style.display = 'none';
  } else {
    lastnameErrorMessages.namedItem("alphabet").style.display = 'block';
  }

  // email validation
  const emailErrorMessages = emailField.parentElement.children;
  const emailFieldValue = emailField.value;

  if (/^[a-z][a-z._0-9]+@[a-z]+\.[a-z]{2,3}$/i.test(emailFieldValue)) {
    emailErrorMessages.namedItem("emailError").style.display = 'none';
  } else {
    emailErrorMessages.namedItem("emailError").style.display = 'block';
  }

  // password validation
  const passwordErrorMessages = passwordField.parentElement.children;
  const passwordFieldValue = passwordField.value;

  if (passwordFieldValue.length >= 8) {
    passwordErrorMessages.namedItem("length").style.display = 'none';
  } else {
    passwordErrorMessages.namedItem("length").style.display = 'block';
  }

  if (/[0-9]/.test(passwordFieldValue)) {
    passwordErrorMessages.namedItem("digit").style.display = 'none';
  } else {
    passwordErrorMessages.namedItem("digit").style.display = 'block';
  }

  if (/[A-Z]/.test(passwordFieldValue)) {
    passwordErrorMessages.namedItem("uppercase").style.display = 'none';
  } else {
    passwordErrorMessages.namedItem("uppercase").style.display = 'block';
  }

  if (/[a-z]/.test(passwordFieldValue)) {
    passwordErrorMessages.namedItem("lowercase").style.display = 'none';
  } else {
    passwordErrorMessages.namedItem("lowercase").style.display = 'block';
  }

  if (/[.,?\/#!$%\^&\*;:{}=\-_`~()]/.test(passwordFieldValue)) {
    passwordErrorMessages.namedItem("punctuation").style.display = 'none';
  } else {
    passwordErrorMessages.namedItem("punctuation").style.display = 'block';
  }

  const errorFields = document.querySelectorAll('.error');
  const isFormValid = [...errorFields].every((errorField) =>{
    // console.log(errorField);
    return window.getComputedStyle(errorField).display === 'none';
  });

  if (isFormValid) {
    regFormModal.style.display = 'block';
    regForm.style.display = 'none';
  }

  console.log(isFormValid);
});

console.log(typeof regForm);
console.log(regForm);
console.log(typeof regForm);
