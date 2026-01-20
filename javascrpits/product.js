document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById("cart-btn");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartBtn = document.getElementById("close-cart");

    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const cartCountEl = document.getElementById("cart-count");

    let cart = [];

    /* =========================
       OUVERTURE / FERMETURE
    ========================== */
    function openCart() {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("show");
    }

    function closeCart() {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("show");
    }

    cartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        openCart();
    });

    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

    /* =========================
       AJOUT AU PANIER
    ========================== */
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            let price = button.dataset.price;

            // Nettoyage du prix
            price = price.replace("€", "").replace(",", ".");
            price = parseFloat(price);

            addToCart(name, price);
            openCart();
        });
    });

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        renderCart();
    }

    /* =========================
       SUPPRESSION
    ========================== */
    function removeItem(index) {
        cart.splice(index, 1);
        renderCart();
    }

    /* =========================
       AFFICHAGE PANIER
    ========================== */
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        let totalItems = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            totalItems += item.quantity;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <div class="cart-item-info">
                    <strong>${item.name}</strong><br>
                    ${item.quantity} × ${item.price.toFixed(2)} €
                </div>
                <button class="remove-item">✖</button>
            `;

            div.querySelector(".remove-item").addEventListener("click", () => {
                removeItem(index);
            });

            cartItemsContainer.appendChild(div);
        });

        cartTotalEl.textContent = total.toFixed(2);
        cartCountEl.textContent = totalItems > 0 ? totalItems : "";
    }
});
const payBtn = document.getElementById("pay-btn");

payBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Votre panier est vide 😢");
        return;
    }

    // Exemple simple (à remplacer par Stripe / Paypal plus tard)
    alert("Redirection vers le paiement 💳");

    console.log("Panier à payer :", cart);
    payBtn.disabled = cart.length === 0;
});
