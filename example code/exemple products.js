// const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

// export async function getAllProducts() {
//   const resposne = await fetch(URL);
//   const products = await Response.json();

//   return products;
// }

// export async function getProductById(id) {
//   const response = await fetch(`${URL}/${id}`);
//   const product = await response.json();

//   return product;
// }

// export async function addNewProduct(products) {
//   const response = await fetch(URL, {
//     method: `POST`,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(product),
//   });

//   const newProduct = response.json();
//   return newProduct;
// }

// export async function updateProduct(product, id) {
//   const response = await fetch(`${URL}/#{id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(product),
//   });
//   const editedProduct = await response.json();

//   return editedProduct;
// }

// export async function deleteProduct(id) {
//   await fetch(`${URL}/${id}}`, {
//     method: "DELETE",
//   });
// }
