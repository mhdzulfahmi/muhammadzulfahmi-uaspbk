<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/ProductStore'

const router = useRouter()
const store = useProductStore()

// Form fields
const nama = ref('')
const kategori = ref('Makanan')
const harga = ref('')
const stok = ref(0)

// Reset form
const resetForm = () => {
  nama.value = ''
  kategori.value = 'Makanan'
  harga.value = ''
  stok.value = 0
}

// Submit handler
const handleSubmit = async () => {
  if (!nama.value || !harga.value) {
    alert('Nama dan harga produk harus diisi.')
    return
  }

  const newProduct = {
    nama: nama.value,
    kategori: kategori.value,
    harga: Number(harga.value),
    stok: Number(stok.value)
  }

  await store.addProduct(newProduct)
  router.push({ name: 'product' })
}
</script>

<template>
  <div class="p-8 bg-gradient-to-br from-sky-50 via-white to-blue-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Tambah Produk</h1>
      <p class="text-gray-600 mt-2">Isi detail produk baru untuk kedai harian Anda</p>
      <div class="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-3"></div>
    </div>

    <!-- Form Container -->
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Nama Produk -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Nama Produk</label>
          <input
            v-model="nama"
            type="text"
            placeholder="Contoh: Gula Pasir 1kg"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <!-- Kategori -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
          <select
            v-model="kategori"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <!-- Harga -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Harga (Rp)</label>
          <input
            v-model="harga"
            type="number"
            placeholder="Contoh: 15000"
            min="0"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <!-- Stok -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Stok Awal</label>
          <input
            v-model="stok"
            type="number"
            placeholder="Contoh: 10"
            min="0"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <!-- Tombol Aksi -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Simpan Produk
          </button>
          <button
            type="button"
            @click="resetForm"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
