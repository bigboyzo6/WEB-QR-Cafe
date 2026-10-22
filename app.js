// Menunggu seluruh elemen DOM siap
document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".product-grid");
  const searchInput = document.getElementById("search-input");
  const filterTags = document.querySelectorAll(".dietary-tag");

  let allProducts = [];

  // 1. Tampilkan Skeleton Loading saat data sedang dimuat
  showSkeletonLoading();

  // 2. Fetch data dari file JSON lokal
  fetch("menu.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data menu");
      }
      return response.json();
    })
    .then((data) => {
      allProducts = data;
      // Simulasi delay sedikit agar animasi skeleton terasa memuaskan
      setTimeout(() => {
        renderProducts(allProducts);
      }, 500);
    })
    .catch((error) => {
      console.error("Error:", error);
      showErrorState("Gagal memuat data menu. Silakan coba lagi.");
    });

  // Function untuk menampilkan animasi Skeleton Loading
  function showSkeletonLoading() {
    if (!productGrid) return;
    productGrid.innerHTML = `
      <div class="product-card skeleton-card"></div>
      <div class="product-card skeleton-card"></div>
      <div class="product-card skeleton-card"></div>
    `;
  }

  // Function untuk merender daftar produk ke HTML
  function renderProducts(products) {
    if (!productGrid) return;

    if (products.length === 0) {
      showEmptyState();
      return;
    }

    productGrid.innerHTML = products
      .map(
        (product) => `
      <div class="product-card">
        <img class="product-image" src="${product.image}" alt="${product.name}">
        <span class="product-title">${product.name}</span>
        <span class="product-desc">${product.description}</span>
        <div class="purchase-row">
          <span class="product-price">Rp ${product.price.toLocaleString("id-ID")}</span>
          <button class="add-btn">+ Tambah</button>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Function jika pencarian/filter kosong (Empty State)
  function showEmptyState() {
    productGrid.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 20px; grid-column: 1/-1;">
        <p style="color: #756C65; margin-bottom: 10px;">Yah, produk tidak ditemukan ☕</p>
        <button id="reset-filter-btn" class="add-btn" style="background-color: #4A2C2A;">Reset Filter</button>
      </div>
    `;

    document.getElementById("reset-filter-btn")?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      filterTags.forEach((tag) => tag.classList.remove("active"));
      renderProducts(allProducts);
    });
  }

  // Function jika koneksi API gagal (Error State)
  function showErrorState(message) {
    if (!productGrid) return;
    productGrid.innerHTML = `
      <div class="error-state" style="text-align: center; padding: 20px; color: #D93838; grid-column: 1/-1;">
        <p>${message}</p>
      </div>
    `;
  }

  // 3. Logika Fitur Search (Kata Kunci)
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      const filtered = allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword)
      );
      renderProducts(filtered);
    });
  }

  // 4. Logika Fitur Filter Kategori
  filterTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      filterTags.forEach((t) => t.classList.remove("active"));
      tag.classList.add("active");

      const category = tag.textContent.trim();
      if (category === "Semua" || category === "All") {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );
        renderProducts(filtered);
      }
    });
  });
});