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
      }
      document.getElementById(
        "content"
      ).innerHTML = `<div class="product-card-container">${sortedProducts
        .map(
          (product) => `
          <div class="product-card">
            <div class="circle"></div>
            <h3>${product.name}</h3>
            <img src=${product.imageURL} />
            <!-- <p>${product.details}</p> -->
            <div class="price-and-cart">
              <p class="price">${product.price} RON</p>
              <div class="details"><a href="details.html"><span class="material-symbols-outlined">
open_in_new
</span></a></div>
            </div>
          </div>`
        )
        .join("")}</div>`;
    });
}
