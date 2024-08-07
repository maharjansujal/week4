document.addEventListener("DOMContentLoaded", function () {
  let productId = new URLSearchParams(window.location.search).get("id");
  let editProductButton = document.getElementById("edit-product");
  if (!productId) {
    document.getElementById("container").innerText = "Product ID is missing";
    return;
  }

  fetch("../products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      individualProduct = data.products[productId - 1];
      document.getElementById("product-image").src = individualProduct.images;
      document.getElementById("product-title").innerText =
        individualProduct.title;
      document.getElementById("rating-stars").innerText =
        "★".repeat(Math.round(individualProduct.rating)) +
     "☆".repeat(5 - Math.round(individualProduct.rating));
      document.getElementById(
        "rating-responses"
      ).innerText = `(${individualProduct.reviews.length} responses)`;
      document.getElementById(
        "price"
      ).innerText = `${individualProduct.price}€`;
      document.getElementById("description").innerText =
        individualProduct.description;
      document.getElementById("return-policy").innerText =
        "Return Policy: " + individualProduct.returnPolicy;
      document.getElementById("view-store").innerText =
        "Availability: " + individualProduct.availabilityStatus;
      document.getElementById("info-care").innerText =
        "Tags: " + individualProduct.tags;
      document.getElementById("category").innerText =
        "Category: " + individualProduct.category;
    })
    
    .catch((error) => {
      document.getElementById(
        "container"
      ).innerText = `Error: ${error.message}`;
      console.error("Error fetching data: ", error);
    });
    editProductButton.addEventListener("click", () => {
      window.location.href = `editProduct.html?id=${individualProduct.id}`;
    });
});
