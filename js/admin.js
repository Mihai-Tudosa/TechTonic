//MockAPI Database
const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

//SetDefaultSort
window.onload = function () {
  getSortProducts({ target: { value: "noi" } });
};

//SortOption Event Listener
const sortOptionsDropDown = document.getElementById(`sort-options`);
sortOptionsDropDown.addEventListener(`change`, getSortProducts);

//Gestionare Produse Event Listener
const gestionareProduse = document.getElementById(`title`);
gestionareProduse.addEventListener(`click`, () =>
  getSortProducts({ target: { value: "noi" } })
);

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
        <span class="table-header th-price grid-one-column">Preț</span>
        <span class="table-header th-quantity grid-one-column"
              >Cantitate</span
            >
        <span class="table-header th-remove grid-one-column">Șterge</span>
      ${sortedProducts
        .map(
          (product) => `
          <div class = "line-item product-line grid-ten-column">
            <img class = "line-item product-image grid-one-column" src=${product.imageURL} />
            <h3 class = "line-item name grid-six-column" ><a href= "#" onclick = "editProduct(${product.id})">${product.name}</a></h3>
            <p class="line-item price grid-one-column">${product.price} RON</p>
            <p class="line-item quantity grid-one-column">${product.quantity}</p>
              <div class="line-item trash-can grid-one-column"><a href= "#" onclick = "deleteProduct(${product.id})"><span class="material-symbols-outlined">
delete
</span></a></div>
        </div>
          </div>`
        )
        .join("")}`;
    });
}

//DeleteProduct Function

function deleteProduct(id) {
  fetch(`${URL}/${id}`, { method: "DELETE" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network Error`);
      }
      console.log(`Deleted product with ID ${id}`);
      getSortProducts({ target: { value: "noi" } });
    })
    .catch((error) =>
      console.error(`There was an error with the fetch operation:`, error)
    );
}

//AddProduct Event Listener
const addProduct = document.getElementById(`add-product`);
addProduct.addEventListener(`click`, showAddProductForm);

//Function that shows the add product form

function showAddProductForm() {
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

  //Anulare Event Listener
  const anulare = document.getElementById(`button-cancel`);
  anulare.addEventListener(`click`, () =>
    getSortProducts({ target: { value: "noi" } })
  );
}

//Function To Edit Product

function editProduct(id) {
  fetch(`${URL}/${id}`)
    .then((response) => response.json())
    .then((product) => {
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
  <input type="text" id="description" name="description"  value="${
    product.details
  }">
  <div></div>

  <div></div>
  <label for="price">Price</label>
  <div></div>
  <input type="number" id="price" name="price"  value="${Number(
    product.price
  )}">
  <div></div>

  <div></div>
  <label for="quantity">Quantity</label>
  <div></div>
  <input type="number" id="quantity" name="quantity"  value="${Number(
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
      //buton de salvat
      const updateProductButton = document.getElementById(
        "button-update-product"
      );
      updateProductButton.addEventListener("click", () =>
        updateProductInDatabase(id)
      );

      //buton de anulat
      const anulare = document.getElementById(`button-cancel`);
      anulare.addEventListener(`click`, () =>
        getSortProducts({ target: { value: "noi" } })
      );
    })
    .catch((error) => console.error(`Error:`, error));

  function updateProductInDatabase(id) {
    const updatedProduct = {
      name: document.getElementById(`name`).value,
      details: document.getElementById(`description`).value,
      price: document.getElementById(`price`).value,
      quantity: document.getElementById(`quantity`).value,
      imageURL: document.getElementById(`image-url`).value,
    };
    fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .then((updatedProduct) => {
        console.log(`Updated entry`, updatedProduct);
        getSortProducts({ target: { value: "noi" } });
      })
      .catch((error) => console.error(`Error:`, error));
  }
}

//Post New Product (Save) Event Listener

function addNewProductInDatabase() {
  const newProduct = {
    name: document.getElementById(`name`).value,
    details: document.getElementById(`description`).value,
    price: document.getElementById(`price`).value,
    quantity: document.getElementById(`quantity`).value,
    imageURL: document.getElementById(`image-url`).value,
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  })
    .then((response) => response.json())
    .then((newProduct) => {
      console.log(`Successful entry`, newProduct);
      getSortProducts({ target: { value: "noi" } });
    })
    .catch((error) => console.error(`Error:`, error));
}
