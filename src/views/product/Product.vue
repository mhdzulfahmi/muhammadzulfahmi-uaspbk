<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore.js'
import { useRouter } from 'vue-router'

const store = useProductStore()
const router = useRouter()

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
</script>

<template>
  <div class="p-8 w-full bg-gradient-to-br from-sky-50 via-white to-blue-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Daftar Produk</h1>
      <p class="text-gray-600 mt-2">Kelola produk kedai harian Anda</p>
      <div class="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-3"></div>
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
            v-for="product in store.products"
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

      <!-- Jika data kosong -->
      <div v-if="store.products.length === 0" class="p-6 text-center text-gray-500">
        Tidak ada produk yang tersedia.
      </div>
    </div>
  </div>
</template>
