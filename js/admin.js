//MockAPI Database
const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

//SetDefaultSort
window.onload = function () {
  getSortProducts({ target: { value: "noi" } });
};

//SortOption Event Listener
const sortOptionsDropDown = document.getElementById(`sort-options`);
sortOptionsDropDown.addEventListener(`change`, getSortProducts);

//Get and Sort Products Function

function getSortProducts(e) {
  const sortOption = e.target.value;
  fetch(URL)
    .then((response) => response.json())
    .then((products) => {
      let sortedProducts = [...products];
      if (sortOption === "noi") {
        sortedProducts.sort((p1, p2) => p2.id - p1.id);
      } else if (sortOption === "priceAsc") {
        sortedProducts.sort((p1, p2) => p1.price - p2.price);
      } else if (sortOption === "priceDesc") {
        sortedProducts.sort((p1, p2) => p2.price - p1.price);
      } else if (sortOption === "nameAsc") {
        sortedProducts.sort((p1, p2) => p1.name.localeCompare(p2.name));
      } else if (sortOption === "nameDesc") {
        sortedProducts.sort((p1, p2) => p2.name.localeCompare(p1.name));
      } else if (sortOption === "qtyAsc") {
        sortedProducts.sort((p1, p2) => p1.quantity - p2.quantity);
      } else if (sortOption === "qtyDesc") {
        sortedProducts.sort((p1, p2) => p2.quantity - p1.quantity);
      }

      document.getElementById("content-table").innerHTML = `
        <span class="table-header th-img grid-one-column">Imagine</span>
        <span class="table-header th-name grid-six-column">Nume</span>
        <span class="table-header th-Price grid-one-column">Preț</span>
        <span class="table-header th-quantity grid-one-column"
              >Cantitate</span
            >
        <span class="table-header th-remove grid-one-column">Șterge</span>
      ${sortedProducts
        .map(
          (product) => `
          <div class = "line-item product-line grid-ten-column">
            <img class = "line-item grid-one-column" src=${product.imageURL} />
            <h3 class = "line-item name grid-six-column" >${product.name}</h3>
            <p class="line-item price grid-one-column">${product.price} RON</p>
            <p class="line-item quantity grid-one-column">${product.quantity}</p>
              <div class="line-item trash-can grid-one-column"><a href="details.html"><span class="material-symbols-outlined">
delete
</span></a></div>
        </div>
          </div>`
        )
        .join("")}`;
    });
}
