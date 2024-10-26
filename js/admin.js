// Import product functions
import {
  categorizeProducts,
  getProducts,
  sortProducts,
} from "../api/product.js";
import { renderProductTable, showAddProductForm } from "../utils/layout.js";

// Function to apply both category and sorting filters and call render product table
async function applyFilters() {
  const products = await getProducts();
  const selectedCategory = document.getElementById("category-options").value;
  const selectedSortOption = document.getElementById("sort-options").value;
  let filteredProducts = await categorizeProducts(products, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts, selectedSortOption);
  renderProductTable(sortedProducts);
}

// Ensure everything is initialized when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Apply default filters
  applyFilters();

  // Set up event listeners for category and sort dropdowns
  const categoryOptionsDropDown = document.getElementById("category-options");
  const sortOptionsDropDown = document.getElementById("sort-options");

  if (categoryOptionsDropDown && sortOptionsDropDown) {
    categoryOptionsDropDown.addEventListener("change", applyFilters);
    sortOptionsDropDown.addEventListener("change", applyFilters);
  }

  // `Add Product` Event Listener
  const addProduct = document.getElementById("add-product");
  if (addProduct) {
    addProduct.addEventListener("click", showAddProductForm);
  }
});
