window.onload = function () {
  let vid = document.getElementById("bg-video");
  vid.playbackRate = 0.75;
}; // Sets the playback speed

const URL = `https://670fe588a85f4164ef2c6118.mockapi.io/products`;

window.addEventListener("load", showAllProducts);

function showAllProducts() {
  fetch(URL)
    .then((response) => response.json())
    .then(
      (products) =>
        (document.getElementById(
          "content"
        ).innerHTML = `<div class="product-card-container">${products
          .map(
            (product) => `
          <div class="product-card">
            <div class="circle"></div>
            <h3>${product.name}</h3>
            <img src=${product.imageURL} />
            <!-- <p>${product.details}</p> -->
            <div class="price-and-cart">
              <p class="price">${product.price} RON</p>
              <div class="details"><a href="details.html"><span class="material-symbols-outlined">
open_in_new
</span></a></div>
            </div>
          </div>`
          )
          .join("")}</div>`)
    );
}
