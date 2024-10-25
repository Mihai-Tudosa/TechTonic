// Import necessary functions from product.js
import { getProducts, showProduct, addToCart } from "../api/product.js";

// URL query parameter to variable
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const queryID = urlParams.get("id");

// Onload Function
window.onload = function () {
  showProduct(queryID);
};
