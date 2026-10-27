const API_URL = "https://6adffa6e8e42963c8d5e9c66.mockapi.io/orders";

function openCustom(name, price, img) {
  const selectedProduct = { name, price, img };
  localStorage.setItem("tempProduct", JSON.stringify(selectedProduct));
  window.location.href = "productcustom.html";
}

function addDirect(name, price, img, desc) {
  let cart = JSON.parse(localStorage.getItem("userCart") || "[]");
  cart.push({ name, price, img, desc });
  localStorage.setItem("userCart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Verifikasi Data Diri Pelanggan
  const verifyForm = document.getElementById("verify-form");
  if (verifyForm) {
    verifyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("input-nama").value;
      const meja = document.getElementById("input-meja").value;
      
      localStorage.setItem("userName", nama);
      localStorage.setItem("userMeja", meja);
      window.location.href = "homelanding.html";
    });
  }

  // Subtitle nama & nomor meja di Checkout
  const checkoutSub = document.getElementById("checkout-user-sub");
  if (checkoutSub) {
    const userName = localStorage.getItem("userName");
    const userMeja = localStorage.getItem("userMeja");
    if (userName && userMeja) {
      checkoutSub.textContent = `Untuk ${userName} - Diantar ke ${userMeja}`;
    } else if (userMeja) {
      checkoutSub.textContent = `Diantar ke ${userMeja}`;
    } else if (userName) {
      checkoutSub.textContent = `Untuk ${userName}`;
    }
  }

  // 2. Logika Kustomisasi Produk (productcustom.html)
  const tempProdStr = localStorage.getItem("tempProduct");
  if (tempProdStr && document.getElementById("custom-title")) {
    const prod = JSON.parse(tempProdStr);
    let extraPrice = 0.55;
    let selectedSugar = "No sugar";
    let selectedMilk = "Almond milk";

    document.getElementById("custom-title").textContent = prod.name;
    document.getElementById("custom-price").textContent = `$${prod.price.toFixed(2)}`;
    document.getElementById("custom-img").src = prod.img;

    const updateTotal = () => {
      const total = prod.price + extraPrice;
      document.getElementById("custom-total-btn").textContent = `$${total.toFixed(2)}`;
    };
    updateTotal();

    const chips = document.querySelectorAll(".chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        selectedSugar = chip.textContent;
      });
    });

    const radioItems = document.querySelectorAll(".radio-item");
    radioItems.forEach(item => {
      item.addEventListener("click", () => {
        radioItems.forEach(r => r.classList.remove("selected"));
        item.classList.add("selected");
        const radioInput = item.querySelector("input[type='radio']");
        if (radioInput) {
          radioInput.checked = true;
          extraPrice = parseFloat(radioInput.value);
          selectedMilk = item.querySelector(".radio-text").textContent;
        }
        updateTotal();
      });
    });

    const btnAddCartCustom = document.getElementById("btn-add-cart-custom");
    if (btnAddCartCustom) {
      btnAddCartCustom.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("userCart") || "[]");
        const finalPrice = prod.price + extraPrice;
        const desc = `${selectedSugar} · ${selectedMilk}`;
        cart.push({ name: prod.name, price: finalPrice, img: prod.img, desc });
        localStorage.setItem("userCart", JSON.stringify(cart));
        window.location.href = "checkout.html";
      });
    }
  }

  // 3. Render Daftar Pesanan & Total di checkout.html
  const cartContainer = document.getElementById("order-list-container");
  if (cartContainer) {
    let cart = JSON.parse(localStorage.getItem("userCart") || "[]");
    const cartEmpty = document.getElementById("cart-empty");
    const cartContent = document.getElementById("cart-content");

    if (cart.length === 0) {
      cartEmpty.style.display = "flex";
      cartContent.style.display = "none";
    } else {
      cartEmpty.style.display = "none";
      cartContent.style.display = "block";

      cartContainer.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
        total += item.price;
        const itemHTML = `
          <div class="order-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
              <h4>1 × ${item.name}</h4>
              <p>${item.desc}</p>
            </div>
            <div class="item-action">
              <span class="price">$${item.price.toFixed(2)}</span>
              <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
          </div>
        `;
        cartContainer.innerHTML += itemHTML;
      });

      document.getElementById("cart-item-count").textContent = `${cart.length} item${cart.length > 1 ? 's' : ''}`;
      document.getElementById("cart-subtotal").textContent = `$${total.toFixed(2)}`;
      document.getElementById("checkout-total-btn").textContent = `$${total.toFixed(2)}`;
    }
  }

  // 4. Proses Checkout & Pengiriman Data Async ke MockAPI
  const btnCheckout = document.getElementById("btn-checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", async () => {
      const cart = JSON.parse(localStorage.getItem("userCart") || "[]");
      const userName = localStorage.getItem("userName") || "Pelanggan";
      const userMeja = localStorage.getItem("userMeja") || "08";

      let total = 0;
      cart.forEach(item => total += item.price);

      const payload = {
        userName: userName,
        userMeja: userMeja,
        items: cart,
        totalPrice: total
      };

      try {
        btnCheckout.textContent = "Memproses...";
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const resultData = await response.json();
          localStorage.setItem("lastOrder", JSON.stringify(resultData.items));
          localStorage.setItem("lastOrderTotal", resultData.totalPrice);
          localStorage.removeItem("userCart");
          window.location.href = "orderconfirmation.html";
        } else {
          alert("Gagal terhubung ke database server.");
          btnCheckout.textContent = "Checkout";
        }
      } catch (error) {
        console.error("Error API:", error);
        alert("Terjadi kesalahan jaringan.");
        btnCheckout.textContent = "Checkout";
      }
    });
  }

  // 5. Render Struk di orderconfirmation.html dari Data Terakhir
  const receiptList = document.getElementById("receipt-items-list");
  if (receiptList) {
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder") || "[]");
    const lastTotal = parseFloat(localStorage.getItem("lastOrderTotal") || "0");
    receiptList.innerHTML = "";

    lastOrder.forEach(item => {
      const rItem = `
        <div class="r-item">
          <span>1 × ${item.name} (${item.desc})</span>
          <span>$${item.price.toFixed(2)}</span>
        </div>
      `;
      receiptList.innerHTML += rItem;
    });

    document.getElementById("receipt-total").textContent = `$${lastTotal.toFixed(2)}`;
  }
});

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("userCart") || "[]");
  cart.splice(index, 1);
  localStorage.setItem("userCart", JSON.stringify(cart));
  window.location.reload();
}