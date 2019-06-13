/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function hide(element) {
  document.querySelector(element).style.display = 'none';
}

function unhide(element) {
  document.querySelector(element).style.display = 'inherit';
}

function bgUnhide(element) {
  document.querySelector(element).style.display = 'flex';
}

function priceChange(element) {
  const newPrice = document.getElementById('new-price').value;
  document.getElementById(element).innerHTML = newPrice;
  event.preventDefault();
}

function markSold(element) {
  document.getElementById(element).innerHTML = 'Sold';
  event.preventDefault();
}
