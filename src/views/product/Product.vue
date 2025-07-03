<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useProductStore } from '@/stores/productStore.js'
import { useRouter } from 'vue-router'

const store = useProductStore()
const router = useRouter()

const selectedKategori = ref('Semua')
const customKategori = ref('')

// Daftar kategori tetap
const kategoriTetap = ['Semua', 'Kebutuhan Pokok', 'Makanan Ringan', 'Minuman', 'Bumbu Dapur', 'Kesehatan', 'Lainnya']

onMounted(() => {
  store.getProducts()
})

const editProduct = (id) => {
  router.push({ name: 'editproduct', params: { id } })
}

const deleteProduct = async (id) => {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    await store.deleteProduct(id)
  }
}

// Handle filter data
const filteredProducts = computed(() => {
  const kategori = selectedKategori.value === 'Lainnya' ? customKategori.value : selectedKategori.value
  return store.byKategori(kategori)
})

// Reset custom kategori jika bukan 'Lainnya'
watch(selectedKategori, (val) => {
  if (val !== 'Lainnya') customKategori.value = ''
})
</script>

<template>
  <div class="p-8 w-full bg-gradient-to-br from-sky-50 via-white to-blue-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Daftar Produk</h1>
      <p class="text-gray-600 mt-2">Kelola produk kedai harian Anda</p>
      <div class="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-3"></div>
    </div>

    <!-- Filter Kategori -->
    <div class="mb-6 max-w-sm">
      <label class="block mb-1 text-sm font-semibold text-gray-700">Filter berdasarkan kategori:</label>
      <select
        v-model="selectedKategori"
        class="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option v-for="kategori in kategoriTetap" :key="kategori" :value="kategori">
          {{ kategori }}
        </option>
      </select>

      <!-- Input kategori jika 'Lainnya' dipilih -->
      <div v-if="selectedKategori === 'Lainnya'" class="mt-3">
        <label class="block mb-1 text-sm font-semibold text-gray-700">Kategori khusus</label>
        <input
          v-model="customKategori"
          type="text"
          placeholder="Masukkan kategori baru"
          class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    </div>

    <!-- Tabel Produk -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gradient-to-r from-sky-100 to-blue-100">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase">Nama Produk</th>
            <th class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase">Kategori</th>
            <th class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase">Harga</th>
            <th class="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase">Stok</th>
            <th class="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            class="hover:bg-sky-50 transition duration-200"
          >
            <td class="px-6 py-4 text-gray-800 font-medium">{{ product.nama }}</td>
            <td class="px-6 py-4 text-gray-600">{{ product.kategori }}</td>
            <td class="px-6 py-4 text-gray-700">Rp {{ Number(product.harga).toLocaleString() }}</td>
            <td class="px-6 py-4">
              <span :class="product.stok > 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-medium'">
                {{ product.stok }}
              </span>
            </td>
            <td class="px-6 py-4 text-center space-x-2">
              <button
                class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm font-semibold"
                @click="editProduct(product.id)"
              >
                ✏️ Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-semibold"
                @click="deleteProduct(product.id)"
              >
                🗑️ Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Kosong -->
      <div v-if="filteredProducts.length === 0" class="p-6 text-center text-gray-500">
        Tidak ada produk dalam kategori ini.
      </div>
    </div>
  </div>
</template>
