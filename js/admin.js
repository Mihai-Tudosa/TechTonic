//Import product functions

import { getProducts, sortProducts } from "../api/product.js";
import { renderProductTable, showAddProductForm } from "../utils/layout.js";

// Set Default Sort
window.onload = async function () {
  const products = await getProducts();
  const sortedProducts = sortProducts(products, "noi");
  renderProductTable(sortedProducts);
};

// `Sort Option` Event Listener
const sortOptionsDropDown = document.getElementById(`sort-options`);
sortOptionsDropDown.addEventListener(`change`, async (e) => {
  const products = await getProducts();
  const sortedProducts = sortProducts(products, e.target.value);
  renderProductTable(sortedProducts);
});

// `Gestionare Produse` Event Listener
const gestionareProduse = document.getElementById(`title`);
gestionareProduse.addEventListener(`click`, async () => {
  const products = await getProducts();
  const sortedProducts = sortProducts(products, "noi");
  renderProductTable(sortedProducts);
});

// `Add Product` Event Listener
const addProduct = document.getElementById(`add-product`);
addProduct.addEventListener(`click`, showAddProductForm);
