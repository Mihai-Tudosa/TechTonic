import { renderProductTable } from "../utils/layout.js";

// URL
const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

// Function to fetch products from the API
export async function getProducts() {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Network response was not ok`);
    }
    return await response.json();
  } catch (error) {
    console.error(`There was a problem with the fetch operation:`, error);
    return [];
  }
}

//Function to filter products based on category

export async function categorizeProducts(products, category) {
  let categorizedProducts = [...products];
  if (category === "Toate") {
    return products;
  } else {
    return categorizedProducts.filter(
      (product) => product.category === category
    );
  }
}

// Function to sort products based on a sort option
export function sortProducts(products, sortOption) {
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
  return sortedProducts;
}

// Function to delete a product from database
export async function deleteProduct(id) {
  try {
    const response = await fetch(`${URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Network Error`);
    }
    console.log(`Deleted product with ID ${id}`);
    await refreshProducts();
  } catch (error) {
    console.error(`There was an error with the fetch operation:`, error);
  }
}

// Function to add a new product in database using table values
export async function addNewProductInDatabase() {
  const newProduct = {
    name: document.getElementById(`name`).value,
    details: document.getElementById(`description`).value,
    price: document.getElementById(`price`).value,
    quantity: document.getElementById(`quantity`).value,
    imageURL: document.getElementById(`image-url`).value,
    category: document.getElementById(`category`).value,
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    console.log(`Successful entry`, data);
    await refreshProducts();
  } catch (error) {
    console.error(`Error:`, error);
  }
}

// Function to update a product in the database
export async function updateProductInDatabase(id) {
  const updatedProduct = {
    name: document.getElementById(`name`).value,
    details: document.getElementById(`description`).value,
    price: document.getElementById(`price`).value,
    quantity: document.getElementById(`quantity`).value,
    imageURL: document.getElementById(`image-url`).value,
    category: document.getElementById(`category`).value,
  };

  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    console.log(`Updated entry`, data);
    await refreshProducts();
  } catch (error) {
    console.error(`Error:`, error);
  }
}

// Function to refresh products
export async function refreshProducts() {
  const sortOptionsDropDown = document.getElementById(`sort-options`);
  const selectedSortOption = sortOptionsDropDown
    ? sortOptionsDropDown.value
    : "noi";

  const products = await getProducts();
  const sortedProducts = sortProducts(products, selectedSortOption);
  renderProductTable(sortedProducts);
}

//Add To Cart function

export function addToCart(itemId, quantity) {
  let cart;
  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
  } else {
    cart = [];
  }
  const existingItem = cart.find((item) => item.id === itemId);
  if (existingItem) {
    existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
  } else {
    cart.push({ id: itemId, quantity: quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(localStorage.getItem("cart"));
}

//Convert Cart To Item

export async function cartToItems() {}

// Expose delete and edit functions to the global scope
window.deleteProduct = deleteProduct;
