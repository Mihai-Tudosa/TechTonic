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
        (document.getElementById("content").innerHTML = products.map(
          (product) => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <img src=${product.imageURL} />
            <p>${product.details}</p>
            <p class = "price">${product.price} RON </p>
        </div>
        `
        ))
    );
}
