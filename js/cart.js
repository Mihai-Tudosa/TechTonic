//MockAPI Database
const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

//Cart Load

window.addEventListener("DOMContentLoaded", loadCart);

//Get and Sort Products Function

// function loadCart() {
//   cart = localStorage.getItem("cart");
//   console.log(cart);
//   document.getElementById("content").innerHTML = `
//   Aici se vor afișa produsele:
//   ${cart.map((produs) => `<div>${produs.id}</div>`).join("")}
// `;
// }

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  console.log(cart);

  function generateCartLine(product) {}
}
