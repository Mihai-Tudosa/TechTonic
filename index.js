// index.js

import {
  getProducts,
  sortProducts,
  renderProductCards,
} from "./api/product.js";

// Set Default Sort
window.onload = async function () {
  const products = await getProducts();
  const sortedProducts = sortProducts(products, "noi");
  renderProductCards(sortedProducts);
};

// Sort Option Event Listener
const sortOptionsDropDown = document.getElementById(`sort-options`);
sortOptionsDropDown.addEventListener(`change`, async (e) => {
  const products = await getProducts();
  const sortedProducts = sortProducts(products, e.target.value);
  renderProductCards(sortedProducts);
});
