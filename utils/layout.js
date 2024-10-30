//import from product
import {
  addNewProductInDatabase,
  addToCart,
  getProducts,
  refreshProducts,
  updateProductInDatabase,
  numberWithSpaces,
  deleteFromCart,
} from "../api/product.js";

// URL
const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

// Show Products in Admin Table
export function renderProductTable(products) {
  document.getElementById("content-table").innerHTML = `
    <span class="table-header th-img grid-one-column">Imagine</span>
    <span class="table-header th-name grid-six-column">Nume</span>
    <span class="table-header th-name grid-one-column">Categorie</span>
    <span class="table-header th-price grid-one-column">Preț</span>
    <span class="table-header th-quantity grid-one-column">Cantitate</span>
    <span class="table-header th-remove grid-one-column">Șterge</span>
  ${products
    .map(
      (product) => `
      <div class="line-item product-line grid-ten-column">
        <div class="line-item grid-one-column product-image"><img class="line-item-img flex-row" src=${
          product.imageURL
        } /></div>
        <div class="line-item name grid-six-column"><a href="#" onclick="editProduct(event, ${
          product.id
        })">${product.name}</a></div>
        <div class="line-item category grid-one-column">${
          product.category
        }</div>
        <div class="line-item price grid-one-column">${numberWithSpaces(
          product.price
        )} RON</div>
        <div class="line-item quantity grid-one-column">${numberWithSpaces(
          product.quantity
        )}</div>
        <div class="line-item trash-can grid-one-column"><a href="#" onclick="deleteProduct(${
          product.id
        })"><span class="material-symbols-outlined">
delete
</span></a></div>
        <div class="line-item details grid-ten-column">${product.details}</div>
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
            <p class="price">${numberWithSpaces(product.price)} RON</p>
            <div class="details"><a href="pages/details.html?id=${
              product.id
            }"><span class="material-symbols-outlined">
open_in_new
</span></a></div>
          </div>
        </div>`
    )
    .join("")}</div>`;
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

    <div></div>
    <label for="category">Category</label>
    <div></div>
    <select id="category" name="category">
        <option value="Procesor">Procesor</option>
        <option value="Placă Video">Placă Video</option>
        <option value="SSD">SSD</option>
        <option value="Sursă">Sursă</option>
        <option value="Placă de Bază">Placă de Bază</option>
        <option value="HDD">HDD</option>
        <option value="Carcasă">Carcasă</option>
    </select>
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

//Function to show edit product form
export async function editProduct(event, id) {
  event.preventDefault();

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

      <div></div>
      <label for="category">Category</label>
      <div></div>
    <select id="category" name="category">
        <option value="Procesor" ${
          product.category === "Procesor" ? "selected" : ""
        }>Procesor</option>
    <option value="Placă Video" ${
      product.category === "Placă Video" ? "selected" : ""
    }>Placă Video</option>
    <option value="SSD" ${
      product.category === "SSD" ? "selected" : ""
    }>SSD</option>
    <option value="Sursă" ${
      product.category === "Sursă" ? "selected" : ""
    }>Sursă</option>
    <option value="Placă de Bază" ${
      product.category === "Placă de Bază" ? "selected" : ""
    }>Placă de Bază</option>
    <option value="HDD" ${
      product.category === "HDD" ? "selected" : ""
    }>HDD</option>
    <option value="Carcasă" ${
      product.category === "Carcasă" ? "selected" : ""
    }>Carcasă</option>
</select>
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

// Show One product function

export async function showProduct(id) {
  try {
    const products = await getProducts();
    const product = products.find((item) => item.id === id);

    if (product) {
      document.getElementById("item-container").innerHTML = `
        <div class="big-image product-card details-card"><img src=${
          product.imageURL
        } /></div>
        <div class="single-item-details product-card details-card">
          <div class="name">${product.name}</div>
          <div class="details">${product.details}</div>
          <div class="price">Preț: ${numberWithSpaces(product.price)} RON</div>
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

//Processed cart to cart lines

export async function cartToLines(cart) {
  if (!Array.isArray(cart)) {
    cart = [];
  }

  document.getElementById("cart-content").innerHTML = `${cart
    .map(
      (product) => `
        <div class="cart-card" style="background-color: white">
          <div class="cart-img">
            <img src="${product.image}" alt="Product Image" />
          </div>
          <div class="cart-category-name cart-small-block">
            <div class="cart-category-only cart-small-text">${
              product.category
            }</div>
            <div class="cart-name-only cart-big-text">${product.name}</div>
          </div>
          <div class="cart-item-each-price cart-small-block">
            <div class="cart-item-each-price-label cart-small-text">Preț Individual:</div>
            <div class="cart-item-each-price-only cart-big-text">${numberWithSpaces(
              product.price
            )}</div>
          </div>
          <div class="cart-quantity cart-small-block">
            <div class="cart-quanity-label cart-small-text">Cantitate:</div>
            <div class="container-quantity-buttons flex-row">
              <button class="button-allunset ${
                product.quantity === 1 ? "button-disabled" : ""
              }" onclick="changeQtyInCart(
                '${product.id}',
                -1
              )" ${product.quantity === 1 ? "disabled" : ""}>
                <span class="material-symbols-outlined plus-minus-button">arrow_circle_down</span>
              </button>
              <div class="cart-quantity-only cart-big-text">${numberWithSpaces(
                product.quantity
              )}</div>
              <button class="button-allunset" onclick="changeQtyInCart(
                '${product.id}',
                1
              )">
                <span class="material-symbols-outlined plus-minus-button">arrow_circle_up</span>
              </button>
            </div>
          </div>
          <div class="cart-item-all-price cart-small-block">
            <div class="cart-item-all-label cart-small-text">Preț total:</div>
            <div class="cart-item-all-label cart-big-text">${numberWithSpaces(
              product.total_price
            )}</div>
          </div>
          <div class="cart-item-delete-button-container cart-small-block">
            <div class="cart-small-text"></div>
            <div class="cart-delete-button-container">
              <span class="material-symbols-outlined cart-delete-button" onclick="deleteFromCart('${
                product.id
              }')">remove_shopping_cart</span>
            </div>
          </div>
        </div>`
    )
    .join("")}`;
}

window.editProduct = editProduct;
