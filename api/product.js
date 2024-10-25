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

// Show Products in Admin Table
export function renderProductTable(products) {
  document.getElementById("content-table").innerHTML = `
    <span class="table-header th-img grid-one-column">Imagine</span>
    <span class="table-header th-name grid-six-column">Nume</span>
    <span class="table-header th-price grid-one-column">Preț</span>
    <span class="table-header th-quantity grid-one-column">Cantitate</span>
    <span class="table-header th-remove grid-one-column">Șterge</span>
  ${products
    .map(
      (product) => `
      <div class="line-item product-line grid-ten-column">
        <img class="line-item product-image grid-one-column" src=${product.imageURL} />
        <h3 class="line-item name grid-six-column"><a href="#" onclick="editProduct(event, ${product.id})">${product.name}</a></h3>
        <p class="line-item price grid-one-column">${product.price} RON</p>
        <p class="line-item quantity grid-one-column">${product.quantity}</p>
        <div class="line-item trash-can grid-one-column"><a href="#" onclick="deleteProduct(${product.id})"><span class="material-symbols-outlined">
delete
</span></a></div>
      </div>
    `
    )
    .join("")}`;
}

// Show Products as Cards

export function renderProductCards(products) {
  document.getElementById(
    "content"
  ).innerHTML = `<div class="product-card-container">${products
    .map(
      (product) => `
        <div class="product-card">
          <div class="circle"></div>
          <h3>${product.name}</h3>
          <img src=${product.imageURL} />
          <div class="price-and-cart">
            <p class="price">${product.price} RON</p>
            <div class="details"><a href="pages/details.html?id=${product.id}"><span class="material-symbols-outlined">
open_in_new
</span></a></div>
          </div>
        </div>`
    )
    .join("")}</div>`;
}

// Function to delete a product
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

// Function to add a new product
export async function addNewProductInDatabase() {
  const newProduct = {
    name: document.getElementById(`name`).value,
    details: document.getElementById(`description`).value,
    price: document.getElementById(`price`).value,
    quantity: document.getElementById(`quantity`).value,
    imageURL: document.getElementById(`image-url`).value,
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

// Function to show the add product form
export function showAddProductForm() {
  document.getElementById("content-table").innerHTML = `

    <div></div>
    <label for="image-url">Image URL</label>
    <div></div>
    <input type="text" id="image-url" name="image-url">
    <div></div>

    <div></div>
    <label for="name">Name</label>
    <div></div>
    <input type="text" id="name" name="name">
    <div></div>

    <div></div>
    <label for="description">Description</label>
    <div></div>
    <input type="text" id="description" name="description">
    <div></div>

    <div></div>
    <label for="price">Price</label>
    <div></div>
    <input type="number" id="price" name="price">
    <div></div>

    <div></div>
    <label for="quantity">Quantity</label>
    <div></div>
    <input type="number" id="quantity" name="quantity">
    <div></div>
    
    <div class="grid-filler"></div>
    <div id="button-add-product">Salvează</div>
    <div class="grid-filler"></div>
    <div class="grid-filler"></div>
    <div id="button-cancel">Anulare</div>
    <div class="grid-filler"></div>
  `;

  const postNewProduct = document.getElementById("button-add-product");
  if (postNewProduct) {
    postNewProduct.addEventListener("click", addNewProductInDatabase);
  }

  // Anulare Event Listener
  const anulare = document.getElementById(`button-cancel`);
  anulare.addEventListener(`click`, refreshProducts);
}

// Function to edit a product
export async function editProduct(event, id) {
  event.preventDefault(); // Prevent the default link behavior

  try {
    const response = await fetch(`${URL}/${id}`);
    const product = await response.json();
    document.getElementById("content-table").innerHTML = `

      <div></div>
      <label for="image-url">Image URL</label>
      <div></div>
      <input type="text" id="image-url" name="image-url" value="${
        product.imageURL
      }">
      <div></div>

      <div></div>
      <label for="name">Name</label>
      <div></div>
      <input type="text" id="name" name="name" value="${product.name}">
      <div></div>

      <div></div>
      <label for="description">Description</label>
      <div></div>
      <input type="text" id="description" name="description" value="${
        product.details
      }">
      <div></div>

      <div></div>
      <label for="price">Price</label>
      <div></div>
      <input type="number" id="price" name="price" value="${Number(
        product.price
      )}">
      <div></div>

      <div></div>
      <label for="quantity">Quantity</label>
      <div></div>
      <input type="number" id="quantity" name="quantity" value="${Number(
        product.quantity
      )}">
      <div></div>
      
      <div class="grid-filler"></div>
      <div id="button-update-product">Modifică</div>
      <div class="grid-filler"></div>
      <div class="grid-filler"></div>
      <div id="button-cancel">Anulare</div>
      <div class="grid-filler"></div>
    `;

    // Button to update the product
    const updateProductButton = document.getElementById(
      "button-update-product"
    );
    updateProductButton.addEventListener("click", () =>
      updateProductInDatabase(id)
    );

    // Button to cancel editing
    const anulare = document.getElementById(`button-cancel`);
    anulare.addEventListener(`click`, refreshProducts);
  } catch (error) {
    console.error(`Error:`, error);
  }
}

// Function to update a product in the database
async function updateProductInDatabase(id) {
  const updatedProduct = {
    name: document.getElementById(`name`).value,
    details: document.getElementById(`description`).value,
    price: document.getElementById(`price`).value,
    quantity: document.getElementById(`quantity`).value,
    imageURL: document.getElementById(`image-url`).value,
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
async function refreshProducts() {
  const sortOptionsDropDown = document.getElementById(`sort-options`);
  const selectedSortOption = sortOptionsDropDown
    ? sortOptionsDropDown.value
    : "noi";

  const products = await getProducts();
  const sortedProducts = sortProducts(products, selectedSortOption);
  renderProductTable(sortedProducts);
}

// Show One product function

export async function showProduct(id) {
  try {
    const products = await getProducts();
    const product = products.find((item) => item.id === id);

    if (product) {
      document.getElementById("item-container").innerHTML = `
        <div class="big-image product-card details-card"><img src=${product.imageURL} /></div>
        <div class="single-item-details product-card details-card">
          <div class="name">${product.name}</div>
          <div class="details">${product.details}</div>
          <div class="price">Preț: ${product.price} RON</div>
          <div class="quantity">În stoc: ${product.quantity} bucăți.</div>
          <div class="qty-select">
            <label for="quantity">Cantitate:</label>
            <input type="number" id="quantity" name="quantity" value="1">
          </div>
          <div id="button-add-to-cart" class="cart-add"><span class="material-symbols-outlined">add_shopping_cart</span>Adaugă în coș</div>
        </div>
      `;

      const addCartButton = document.getElementById("button-add-to-cart");
      addCartButton.addEventListener("click", () =>
        addToCart(id, document.getElementById("quantity").value)
      );
    } else {
      document.getElementById(
        "item-container"
      ).innerHTML = `<div>Product not found.</div>`;
    }
  } catch (error) {
    console.error(`Error fetching product:`, error);
  }
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

// Expose delete and edit functions to the global scope
window.deleteProduct = deleteProduct;
window.editProduct = editProduct;
