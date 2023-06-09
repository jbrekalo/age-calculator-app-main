"use strict";

////////////////////////
// Elements
const submitButton = document.querySelector(".submit-button");
const resultYear = document.querySelector(".result-number--year");
const resultMonth = document.querySelector(".result-number--month");
const resultDay = document.querySelector(".result-number--day");
const formDay = document.querySelector(".form--day");
const formMonth = document.querySelector(".form--month");
const formYear = document.querySelector(".form--year");
const forms = document.querySelectorAll(".form-input");
const formLabels = document.querySelectorAll(".form-label");
const formInputs = document.querySelectorAll(".form-input");

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

////////////////////////
// Check inputs
const checkDay = function (inputDay, inputMonth) {
  if (!inputDay) {
    errorMarking("This field is required", formDay);
    return false;
  } else if (inputDay > monthDays[inputMonth - 1] || inputDay <= 0) {
    errorMarking("Must be a valid day", formDay);
    return false;
  } else if (isNaN(inputDay)) {
    errorMarking("Must be a number", formDay);
    return false;
  } else {
    return true;
  }
};

const checkMonth = function (inputMonth) {
  if (!inputMonth) {
    errorMarking("This field is required", formMonth);
    return false;
  } else if (inputMonth > 12 || inputMonth <= 0) {
    errorMarking("Must be a valid month", formMonth);
    return false;
  } else if (isNaN(inputMonth)) {
    errorMarking("Must be a number", formMonth);
    return false;
  } else {
    return true;
  }
};

const checkYear = function (inputYear, currentYear) {
  if (!inputYear) {
    errorMarking("This field is required", formYear);
    return false;
  } else if (inputYear > currentYear) {
    errorMarking("Must be in the past", formYear);
    return false;
  } else if (isNaN(inputYear)) {
    errorMarking("Must be a number", formYear);
    return false;
  } else {
    return true;
  }
};

////////////////////////
// Functions

// Error handling
const errorMarking = function (errorText, position) {
  formLabels.forEach((label) => {
    label.classList.add("form-label--error");
  });
  formInputs.forEach((input) => {
    input.classList.add("form-input--error");
  });

  const error = `<div class="form-text--error">${errorText}</div>`;
  position.insertAdjacentHTML("beforeend", error);
};

const errorReset = function () {
  formLabels.forEach((label) => {
    label.classList.remove("form-label--error");
  });
  formInputs.forEach((input) => {
    input.classList.remove("form-input--error");
  });
  forms.forEach((form) => {
    const errorText = form.nextElementSibling;
    if (errorText && errorText.classList.contains("form-text--error")) {
      errorText.remove();
    }
  });
};

// Calculate and display date
const calcDisplayDate = function (dates) {
  const { curDay, curMonth, curYear, inpDay, inpMonth, inpYear } = dates;

  let calcDay = curDay - inpDay;
  let calcMonth = curMonth - inpMonth;
  let calcYear = curYear - inpYear;
  console.log(calcDay, calcMonth, calcYear);

  if (calcDay < 0) {
    if (calcMonth > 0) {
      calcDay += monthDays[calcMonth - 1];
      calcMonth--;
    } else {
      calcMonth += 11;
      calcDay += monthDays[calcMonth - 1];
      calcYear--;
    }
  } else if (calcMonth < 0) {
    calcYear--;
    calcMonth = calcMonth + 11;
    if (calcMonth > 12) {
      calcMonth -= 12;
    } else {
      calcMonth++;
    }
  }

  resultDay.textContent = calcDay;
  resultMonth.textContent = calcMonth;
  resultYear.textContent = calcYear;
};

////////////////////////
// Event listener
submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  let inputDay = document.querySelector(".form-input--day").value;
  let inputMonth = document.querySelector(".form-input--month").value;
  let inputYear = document.querySelector(".form-input--year").value;

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  errorReset();

  let checkD = checkDay(inputDay, inputMonth);
  let checkM = checkMonth(inputMonth);
  let checkY = checkYear(inputYear, currentYear);

  if (!(checkD && checkM && checkY)) {
    resultDay.textContent = "--";
    resultMonth.textContent = "--";
    resultYear.textContent = "--";
    return;
  }

  calcDisplayDate({
    curDay: currentDay,
    curMonth: currentMonth,
    curYear: currentYear,
    inpDay: inputDay,
    inpMonth: inputMonth,
    inpYear: inputYear,
  });
});
