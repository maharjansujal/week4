const fs = require('fs');
document.addEventListener("DOMContentLoaded", function () {
    let productId = new URLSearchParams(window.location.search).get("id");
    const form = document.getElementById('edit-product-form');

    if (!productId) {
        document.getElementById("container").innerText = "Product ID is missing";
        return;
    }

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form input values
        const title = document.getElementById('title').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const tags = document.getElementById('tags').value;
        const image = document.getElementById('image').value;

        try {
            let products = await getArray();
            // Update the product
            if (products[productId - 1]) {
                products[productId - 1].title = title;
                products[productId - 1].price = parseFloat(price); // Ensure price is a number
                products[productId - 1].description = description;
                products[productId - 1].category = category;
                products[productId - 1].tags = tags;
                products[productId - 1].image = image;
                
                // Read the JSON file
                const jsonData = require('../products.json');
                // Update the data
                jsonData.products = products;
                // Write the updated data back to the JSON file
                fs.writeFileSync('../products.json', JSON.stringify(jsonData, null, 2));
                
                console.log('Data updated successfully.');
                // console.log(products[productId - 1]);
                // console.log('Product updated successfully:', products);
            } else {
                document.getElementById("container").innerText = "Product not found";
            }
        } catch (error) {
            console.error("Error updating product:", error);
            document.getElementById("container").innerText = "Error updating product";
        }
    });
});

async function getArray() {
    try {
        let response = await fetch("../products.json");
        if (!response.ok) throw new Error("Network response was not ok");
        let data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
