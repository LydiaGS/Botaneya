let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
            image: button.dataset.image
        };

        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Produit ajouté au panier");
    });
});