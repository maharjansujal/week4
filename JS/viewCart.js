let cart = JSON.parse(localStorage.getItem("cart")) || [];

let displayCartProducts = () => {
    let cartContainer = document.getElementById('cart-container');
    let totalPriceElem = document.getElementById('total-price');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='text-center text-gray-700'>Your cart is empty.</p>";
        totalPriceElem.textContent = "Total Price: $0.00";
        return;
    }

    let totalPrice = 0;
    cartContainer.innerHTML = cart.map(data => {
        const itemTotal = (data.price * (data.quantity || 1)).toFixed(2);
        totalPrice += parseFloat(itemTotal);

        return `
            <div class="cart-item flex items-center justify-between border-b border-gray-300 py-4">
                <div class="flex items-center">
                    <img src="${data.images || 'default-image.jpg'}" alt="${data.title}" class="w-16 h-16 object-cover mr-4" />
                    <div>
                        <h2 class="text-lg font-semibold">${data.title}</h2>
                        <p class="text-gray-600">Price: $${data.price.toFixed(2)}</p>
                    </div>
                </div>
                <div>
                    <span class="text-gray-700">Quantity: ${data.quantity || 1}</span>
                    <p class="font-semibold text-blue-700">$${itemTotal}</p>
                </div>
            </div>
        `;
    }).join('');

    totalPriceElem.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

displayCartProducts();
