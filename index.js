import {
  categorizeProducts,
  getProducts,
  sortProducts,
} from "./api/product.js";
import { renderProductCards } from "./utils/layout.js";

// Set Default Filters on Page Load
document.addEventListener("DOMContentLoaded", applyFilters);

// Function to apply both category and sorting filters and call render product cards
async function applyFilters() {
  const products = await getProducts();
  const selectedCategory = document.getElementById("category-options").value;
  const selectedSortOption = document.getElementById("sort-options").value;
  let filteredProducts = await categorizeProducts(products, selectedCategory);
  const sortedProducts = sortProducts(filteredProducts, selectedSortOption);
  renderProductCards(sortedProducts);
}

// Sort Option Event Listener
const sortOptionsDropDown = document.getElementById("sort-options");
sortOptionsDropDown.addEventListener("change", applyFilters);

// Category Option Event Listener
const categoryOptionsDropDown = document.getElementById("category-options");
categoryOptionsDropDown.addEventListener("change", applyFilters);
