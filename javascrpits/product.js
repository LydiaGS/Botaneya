document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // ÉLÉMENTS DOM
    // ======================
    const cartBtn = document.getElementById("cart-btn");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const cartCountEl = document.getElementById("cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // ======================
    // PANIER
    // ======================
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ======================
    // OUVRIR / FERMER PANIER
    // ======================
    cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("show");
    });

    function closeCart() {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("show");
    }

    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    // ======================
    // AJOUT AU PANIER
    // ======================
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            const existingProduct = cart.find(item => item.name === name);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveCart();
            renderCart();

            cartDrawer.classList.add("open");
            cartOverlay.classList.add("show");
        });
    });

    // ======================
    // AFFICHAGE PANIER
    // ======================
    function renderCart() {
        cartItemsContainer.innerHTML = "";

        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Votre panier est vide</p>";
        }

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalItems += item.quantity;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong><br>
                        ${item.quantity} × ${item.price.toFixed(2)} €
                    </div>
                    <button class="remove-item" data-index="${index}">✖</button>
                </div>
            `;
        });

        cartTotalEl.textContent = total.toFixed(2);
        cartCountEl.textContent = totalItems || "";

        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", () => {
                cart.splice(btn.dataset.index, 1);
                saveCart();
                renderCart();
            });
        });
    }

    // ======================
    // SAUVEGARDE
    // ======================
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ======================
    // INIT
    // ======================
    renderCart();

});
if (cartOverlay) {
    cartOverlay.classList.add("show");
    cartOverlay.addEventListener("click", closeCart);
}