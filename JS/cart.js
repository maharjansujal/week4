

fetch("../products.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        productArray = data.products;
        localStorage.setItem("products", JSON.stringify(productArray));
        if (!localStorage.getItem("cart")) {
            localStorage.setItem("cart", "[]");
        }
    });

let productArray = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let add_to_cart_button = document.getElementById("add-to-cart");
let removeFromCartButton = document.getElementById("remove-from-cart");


let addToCart = (productId) => {
    let product = productArray[productId-1]
    if(cart.length==0){
        cart.push(product);
    }else{
        let existingProduct = cart.find(element=>element.id==productId);
        if (existingProduct==undefined){
            cart.push(product);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

let removeFromCart = (productId) => {

    let productIndex = cart.findIndex(product => product.id == productId);

    if (productIndex === -1) {
        removeFromCartButton.style.display = "none";
    } else {
        cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        if (cart.length === 0) {
            removeFromCartButton.style.display = "none";
        }
    }
}

let checkEmptyCart =() =>{
    if (cart.length==0) {
        removeFromCartButton.style.display = "none";
    }
    else{
        removeFromCartButton.style.display = "block";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    let productId = new URLSearchParams(window.location.search).get("id");
    if (!productId) {
        document.getElementById("container").innerText = "Product ID is missing";
    }
    checkEmptyCart();
    add_to_cart_button.addEventListener("click", () => {
        addToCart(productId)
        checkEmptyCart();
    })
    removeFromCartButton.addEventListener("click",()=>{
        removeFromCart(productId)
    })
})    
