// Variables
const cardName = document.querySelector("#username");
const cardNumber = document.querySelector("#card-name");
const birth = document.querySelector("#birth");
const year = document.querySelector("#year");
const cvc = document.querySelector("#cvc");
const success = document.querySelector(".success");
const info = document.querySelector(".info");
const form = document.querySelector(".info__form");

const btnContinue = document.querySelector("#btn-continue");

// Regex
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?¿~]/;

// Event Listeners
eventListeners();
function eventListeners() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkRequired([cardName, cardNumber, birth, year, cvc]);
    checkName(cardName, 3, 15);
    checkCardNumber(cardNumber, 19);
    checkCardNumber(cvc, 3);
    sendInfo();
  });

  btnContinue.addEventListener("click", () => location.reload());
}

// Functions

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, "can't be blank");
      return;
    } else {
      showSucces(input);
      return;
    }
  });
}

// Show Error if does not pass the validation
function showError(input, msg) {
  cleanHTML(input.closest(".info__space"));
  input.parentElement.querySelector("input").classList.add("error");

  const message = document.createElement("p");

  message.classList.add("error-msg");
  message.textContent = msg;

  if (input.parentElement.classList.contains("info__space-year")) {
    return;
  }
  input.closest(".info__space").append(message);
}

// Show if pass the validation
function showSucces(input) {
  const parent = input.parentElement.querySelector("input");
  parent.classList.remove("error");

  const exists = input.parentElement.querySelector("p");
  if (exists) exists.remove();
}

// Check the value of the name
function checkName(input, min, max) {
  if (/[0-9]/.test(input.value) || specialChars.test(input.value)) {
    showError(input, "Must include only letters");
  } else if (input.value.length < min) {
    showError(input, `Must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `Must be less than ${max} characters`);
  }
}

// Check the value of the card number
function checkCardNumber(input, minmax) {
  if (!/[0-9]/.test(input.value) || specialChars.test(input.value)) {
    showError(input, "Wrong format numbers only");
  } else if (input.value.length !== minmax) {
    showError(input, `Number of characters must be ${minmax}`);
  }
}

function sendInfo() {
  const exists = document.querySelector(".error-msg");
  if (!exists) {
    success.classList.remove("none");
    info.classList.add("none");
  }
}

// Clean paragraph
function cleanHTML(element) {
  if (element.lastChild.classList !== undefined) {
    element.removeChild(element.lastChild);
  }
}
