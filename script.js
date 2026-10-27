
const products = document.querySelectorAll(".product-card");
const filters = document.querySelectorAll(".filter");

let cart = [];
let selectedProduct = null;

function formatPrice(price) {
    return Number(price).toLocaleString("uz-UZ") + " so'm";
}

function showToast(text) {
    const toast = document.getElementById("toast");
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
}

filters.forEach(btn => {
    btn.onclick = () => {
        filters.forEach(f => f.classList.remove("active"));
        btn.classList.add("active");

        products.forEach(p => {
            p.style.display =
                btn.dataset.filter === "all" ||
                p.dataset.category === btn.dataset.filter ? "" : "none";
        });
    };
});

document.querySelectorAll(".heart").forEach(btn => {
    btn.onclick = () => {
        btn.classList.toggle("liked");
        btn.textContent = btn.classList.contains("liked") ? "♥" : "♡";
    };
});

document.querySelectorAll(".quick-view").forEach(btn => {
    btn.onclick = () => {
        const p = btn.closest(".product-card");

        document.getElementById("modalName").textContent = p.dataset.name;
        document.getElementById("modalPrice").textContent = formatPrice(p.dataset.price);

        const info = document.getElementById("modalInfo");
        if (info) {
            info.textContent = p.dataset.description ||
                p.querySelector(".product-info")?.textContent ||
                "Zamonaviy futbolka, qulay mato va chiroyli dizayn.";
        }

        selectedProduct = p;
        document.getElementById("productModal").classList.add("show");
        document.getElementById("overlay").classList.add("show");
    };
});

document.getElementById("closeModal").onclick = () => {
    document.getElementById("productModal").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
};

document.querySelectorAll(".add-cart").forEach(btn => {
    btn.onclick = () => {
        const p = btn.closest(".product-card");
        cart.push(p.dataset.name);
        showToast("Savatga qo'shildi!");
    };
});

document.getElementById("modalAdd").onclick = () => {
    if (!selectedProduct) return;
    cart.push(selectedProduct.dataset.name);
    showToast("Savatga qo'shildi!");
};

document.getElementById("menuBtn")?.addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("show");
});
