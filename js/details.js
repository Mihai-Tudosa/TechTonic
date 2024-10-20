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
            <div class = "details">${product.details}</div>
            <div class = "price">Preț: ${product.price} RON</div>
            <div class = "quantity">În stoc: ${product.quantity} bucăți.</div>
            <div class = "qty-select">
            <label for="quantity">Cantitate:</label>
            <input type="number" id="quantity" name="quantity" value="1">
            </div>
            <div id="button-add-to-cart" class ="cart-add"><span class="material-symbols-outlined">
add_shopping_cart
</span>Adaugă în coș</div>
            
        </div>
      `;
    });
}
