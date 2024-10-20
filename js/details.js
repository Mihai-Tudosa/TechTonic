//MockAPI Database
const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

//URL query parameter to variable

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryID = urlParams.get("id");

//Onload Function
window.onload = function () {
  showProducts(queryID);
};

//Load Product

function showProducts(id) {
  fetch(`${URL}/${id}`)
    .then((response) => response.json())
    .then((product) => {
      document.getElementById("item-container").innerHTML = `
        <div class="big-image product-card details-card"><img src=${product.imageURL} /></div>
        <div class="single-item-details product-card details-card">
            <div class = "name">${product.name}</div>
            <div class = "price">${product.price} RON</div>
            <div class = "quantity">În stoc: ${product.quantity} bucăți.</div>
            <div class = "qty-select">WIP: qty selector</div>
            <div class = "add-to-cart">WIP: Add to cart button</div>
        </div>
      `;
    });
}
