import { numberWithSpaces, processCart } from "../api/product.js";
import { cartToLines } from "../utils/layout.js";

//Cart Load

window.addEventListener("DOMContentLoaded", async () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!Array.isArray(cart)) {
    cart = [];
  }
  const processedCart = await processCart(cart);
  console.log("Processed Cart on load:", processedCart);
  cartToLines(processedCart);
});

//Cart Summary
export async function renderCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const processedCart = await processCart(cart);

  // Totaluri
  const totalProductsCost = processedCart.reduce(
    (sum, item) => sum + item.total_price,
    0
  );

  // Shipping cost peste 500 gratis
  const shippingCost = totalProductsCost > 500 ? 0 : 15;

  // verifica localStorage pentru discount code
  const promo = JSON.parse(localStorage.getItem("promo")) || {
    code: "",
    discount: 0,
  };
  let discount = 0;

  if (promo.code === "BF10") {
    discount = totalProductsCost * 0.1; // 10% discount
  }

  // Save updated discount to localStorage
  localStorage.setItem("promo", JSON.stringify({ ...promo, discount }));

  const totalCost = totalProductsCost + shippingCost - discount;

  // display tot
  document.getElementById("cart-content-total").innerHTML = `
    <div class="cart-card-total">
      <div class="cart-card-t flex-col">
        <div class="cart-total cart-total-line">
          <div>Ai un cod promoțional?</div>
        </div>
        <div class="cart-total cart-total-line">
          <label for="promo-code" class="items-center">Introdu Codul:</label>
          <div class="code-and-button">
            <input type="text" id="promo-code" name="promo-code" placeholder="hint: BF10" value="${
              promo.code
            }" />
            <div id="promo-remove-button" class="promo-remove-button-container">
              <span class="material-symbols-outlined promo-remove-button">disabled_by_default</span>
            </div>
          </div>
        </div>
        <div class="cart-total cart-total-line">
          <div>Discount aplicat:</div>
          <div>${
            discount > 0
              ? `-${numberWithSpaces(discount.toFixed(2))} RON`
              : "n/a"
          }</div>
        </div>
        <div class="cart-total cart-total-line">
          <div>Folosește codul:</div>
          <div id="apply-promo-button" class="apply-promo-button-container promo-add-button-container">
            <span class="material-symbols-outlined promo-add-button">percent</span>
          </div>
        </div>
      </div>
      <div class="cart-card-t cart-card-prices">
        <div class="cart-total cart-total-line">
          <div>Cost Produse:</div>
          <div>${numberWithSpaces(totalProductsCost.toFixed(2))} RON</div>
        </div>
        <div class="cart-shipping cart-total-line">
          <div>Cost Livrare:</div>
          <div>${numberWithSpaces(shippingCost.toFixed(2))} RON</div>
        </div>
        <div class="cart-discount cart-total-line">
          <div>Discount:</div>
          <div>${numberWithSpaces(discount.toFixed(2))} RON</div>
        </div>
        <div class="cart-total-after-shipping cart-total-line">
          <div>Total:</div>
          <div>${numberWithSpaces(totalCost.toFixed(2))} RON</div>
        </div>
        <div class="cart-total-line promo-add-button-container">
          <div>Checkout</div>
          <span class="material-symbols-outlined promo-add-button">shopping_cart_checkout</span>
        </div>
      </div>
    </div>
  `;

  // event listener la promo button
  const promoButton = document.getElementById("apply-promo-button");
  if (promoButton) {
    promoButton.addEventListener("click", applyPromoCode);
  }

  // event listener la remove promo button
  const removePromoButton = document.getElementById("promo-remove-button");
  if (removePromoButton) {
    removePromoButton.addEventListener("click", () => {
      // sterge din localstorage ce e salvat in promo code
      localStorage.removeItem("promo");
      // sterge ce e in fieldu de promo code
      document.getElementById("promo-code").value = "";
      //reafiseaza tot
      renderCartSummary();
    });
  }
}

// Functie Promo Code
async function applyPromoCode() {
  const promoInput = document.getElementById("promo-code").value.trim();
  const validCode = "BF10";
  const discountRate = 0.1;

  if (promoInput === validCode) {
    // Calculeaza discount
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const processedCart = await processCart(cart);
    const totalProductsCost = processedCart.reduce(
      (sum, item) => sum + item.total_price,
      0
    );
    const discountAmount = totalProductsCost * discountRate;

    // Save promo code and discount in localStorage
    localStorage.setItem(
      "promo",
      JSON.stringify({ code: promoInput, discount: discountAmount })
    );

    alert(
      `Codul a fost aplicat! Ai economisit ${discountAmount.toFixed(2)} RON.`
    );
    await renderCartSummary(); // Update summary with the discount
  } else {
    alert("Codul nu este corect :(");
  }
}

// Call renderCartSummary on DOMContentLoaded
window.addEventListener("DOMContentLoaded", renderCartSummary);
