# 🛒 Kedai Harian - Manajemen Produk dan Transaksi

**Kedai Harian** adalah aplikasi berbasis web untuk membantu UMKM seperti toko kelontong atau warung harian dalam mengelola produk, stok, transaksi, dan laporan sederhana.

## 🚀 Teknologi yang Digunakan

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Vue Router](https://router.vuejs.org/)
- [JSON Server](https://github.com/typicode/json-server) (mock REST API)
- Tailwind CSS (untuk styling)

---

## 📦 Fitur Utama

| Fitur               | Deskripsi                                                                 |
|---------------------|---------------------------------------------------------------------------|
| Dashboard           | Menampilkan ringkasan jumlah produk, stok, dan transaksi secara statis    |
| Kelola Produk       | Tambah, edit, hapus, dan lihat daftar produk                              |
| Kategori Dinamis    | Dropdown kategori produk + input kategori baru jika memilih "Lainnya"     |
| Filter Kategori     | Menyaring produk berdasarkan kategori                                      |
| Manajemen Stok      | Menampilkan dan mengelola stok tiap produk                                |
| Transaksi (Dummy)   | Halaman daftar dan tambah transaksi sederhana                             |
| Sidebar Navigasi    | Navigasi responsif antar halaman                                           |

---

## 📁 Struktur Folder
src/
├── assets/
├── components/
│ └── Sidebar.vue
├── router/
│ └── index.js
├── stores/
│ └── productStore.js
├── views/
│ ├── dashboard/ # Dashboard utama
│ ├── product/
│ │ ├── AddProduct.vue
│ │ ├── EditProduct.vue
│ │ └── Product.vue
│ └── transaksi/
│ ├── AddTransaksi.vue
│ └── Transaksi.vue
├── App.vue
└── main.js

---

## 📡 JSON Server Setup

**Contoh `db.json`**:

```json
{
  "product": [
    {
      "id": "1",
      "nama": "Beras 5kg",
      "kategori": "Kebutuhan Pokok",
      "harga": 68000,
      "stok": 20
    },
    {
      "id": "2",
      "nama": "Minyak Goreng 1L",
      "kategori": "Bumbu",
      "harga": 16000,
      "stok": 10
    }
  ]
}

---

## Endpoint

| Method | Endpoint       | Deskripsi                |
| ------ | -------------- | ------------------------ |
| GET    | `/product`     | Mengambil semua produk   |
| POST   | `/product`     | Menambah produk baru     |
| GET    | `/product/:id` | Mendapatkan produk by ID |
| PUT    | `/product/:id` | Update data produk       |
| DELETE | `/product/:id` | Menghapus produk         |

---

## Routingan

| Path                | Nama Router  | Komponen           |
| ------------------- | ------------ | ------------------ |
| `/`                 | dashboard    | `Dashboard.vue`    |
| `/product`          | product      | `Product.vue`      |
| `/product/add`      | addproduct   | `AddProduct.vue`   |
| `/product/edit/:id` | editproduct  | `EditProduct.vue`  |
| `/transaksi`        | transaksi    | `Transaksi.vue`    |
| `/transaksi/add`    | addtransaksi | `AddTransaksi.vue` |
| `/transaksi/edit/:id`| edittransaksi | `EditTransaksi.vue` |

