
let displayProduct= ()=>{
  fetch("../products.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          let product_container = document.getElementById("product-container");
          data.products.forEach((product) => {
            let product_card = document.createElement("div");
            product_card.className = `card bg-white shadow-md max-w-[390px] w-full rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer`;
            product_card.innerHTML = `
            <img class="w-full h-auto max-w-[330px] max-h-[200px] object-cover mx-auto" src="${
              product.thumbnail
            }" alt="${product.title}">
            <div class="p-4">
                <h2 class="text-xl font-bold mb-2 truncate">${
                  product.title
                }</h2>
                <div class="flex items-center mb-2">
                    <span class="text-yellow-400 mr-2">${"★".repeat(
                      Math.round(product.rating)
                    )}${"☆".repeat(5 - Math.round(product.rating))}</span>
                    <span class="text-gray-600">(${
                      product.reviews.length
                    } responses)</span>
                </div>
                <p class="text-xl font-semibold mb-4">€ ${product.price}</p>
                <button class="w-full bg-black text-white py-2 rounded mb-2">ADD TO BAG</button>
                <button class="w-full bg-gray-200 text-black py-2 rounded">WISHLIST</button>
            </div>`;
            product_card.addEventListener("click", () => {
              window.location.href = `individualProduct.html?id=${product.id}`;
            });
            product_container.appendChild(product_card);
          });
          let cardsPerPage = 10;
          let pagination = document.getElementById("pagination");
          let previousButton = document.getElementById("previous");
          let nextButton = document.getElementById("next");
          let pageNumbers = document.getElementById("page-numbers");
          let pageLinks = document.querySelectorAll(".page-link");
          const cards = Array.from(
            product_container.getElementsByClassName("card")
          );

          //Calculate total number of pages
          let totalPages = Math.ceil(cards.length / cardsPerPage);
          let currentPage = 1;

          //Display cards for specific page
          let displayPage = (page) => {
            let startIndex = (page - 1) * cardsPerPage; //Index of the first card to display in the page
            let endIndex = startIndex + cardsPerPage; //Index of the last card to display in the page
            cards.forEach((card, index) => {
              if (index >= startIndex && index < endIndex) {
                card.style.display = "block";
              } else {
                card.style.display = "none";
              }
            });
          };
          // Update pagination
          let updatePagination = () => {
            pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
            previousButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
            pageLinks.forEach((link) => {
              let page = parseInt(link.getAttribute("data-page"));
              link.classList.toggle("active", page === currentPage);
            });
          };

          //Previous function functionality:
          if (previousButton){
            previousButton.addEventListener("click", (e) => {
              e.preventDefault();
              if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
                updatePagination();
              }
            });
          }
          

          //Next button functionality
          if (nextButton) {
            nextButton.addEventListener("click", (e) => {
              e.preventDefault(); // Prevents page from jumping to top
              if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
                updatePagination();
              }
            });
          }

          //Page number buttons
          pageLinks.forEach((link) => {
            link.addEventListener("click", () => {
              // e.preventDefault();
              let page = parseInt(link.getAttribute("data-page"));
              if (page != currentPage) {
                currentPage = page;
                displayPage(currentPage);
                updatePagination();
              }
            });
          });
          displayPage(currentPage);
          updatePagination();
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
}
displayProduct();

