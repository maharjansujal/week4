fetch("../test.json")
.then(response=>{
    return response.json();
})
.then(data=>{
    localStorage.setItem("products", JSON.stringify(data));
    if (!localStorage.getItem("cart")){
        localStorage.setItem("cart","[]");
    }
});

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"))||[];

let addToCart=(productId)=>{
    let product = products.find(product=>{
        return product.id ==productId;
    });
    if(cart.length==0){
        cart.push(product);
    }else{
        let res = cart.find(element=>element.id==productId);
        if (res==undefined){
            cart.push(product);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

addToCart(1)
addToCart(2)