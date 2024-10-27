import { processCart } from "../api/product.js";
import { cartToLines } from "../utils/layout.js";

//MockAPI Database
const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

//Cart Load

window.addEventListener("DOMContentLoaded", async () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const processedCart = await processCart(cart);
  console.log("Processed Cart:", processedCart);
  cartToLines(processedCart);
});
