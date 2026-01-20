// ===============================
// FAQ ACCORDÉON
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            item.classList.toggle('active');
        });
    });

    // ===============================
    // EMAILJS INIT
    // ===============================
    (function () {
        emailjs.init("pBMx5f_soArWQDzqS");
        console.log("✅ EmailJS initialisé");
    })();

    // ===============================
    // FORMULAIRE CONTACT
    // ===============================
    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("❌ Formulaire introuvable");
        return;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_jjxz4c6",
            "template_ijnntsq",
            form
        )
        .then(() => {
            alert("✅ Mail envoyé");
        })
        .catch(err => {
            console.error("❌ EmailJS error:", err);
            alert("❌ Erreur EmailJS (voir console)");
        });
    });

}); // ✅ FIN DU DOMContentLoaded

