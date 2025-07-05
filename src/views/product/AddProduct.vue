<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore.js'

const router = useRouter()
const store = useProductStore()

// Form fields
const nama = ref('')
const kategori = ref('')
const customKategori = ref('')
const harga = ref('')
const stok = ref(0)
const isCustomKategori = ref(false)

const kategoriOptions = [
  'Kebutuhan Pokok',
  'Minuman',
  'Bumbu Dapur',
  'Snack',
  'Perlengkapan Mandi',
  'Lainnya'
]

watch(kategori, (value) => {
  isCustomKategori.value = value === 'Lainnya'
})

// Reset form
const resetForm = () => {
  nama.value = ''
  kategori.value = ''
  customKategori.value = ''
  harga.value = ''
  stok.value = 0
  isCustomKategori.value = false
}

// Submit handler
const handleSubmit = async () => {
  if (!nama.value || !harga.value) {
    alert('Nama dan harga produk harus diisi.')
    return
  }

  const finalKategori = isCustomKategori.value ? customKategori.value.trim() : kategori.value

  if (!finalKategori) {
    alert('Kategori harus diisi.')
    return
  }

  const newProduct = {
    nama: nama.value,
    kategori: finalKategori,
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
            <option disabled value="">-- Pilih Kategori --</option>
            <option v-for="item in kategoriOptions" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>

        <!-- Kategori Custom -->
        <div v-if="isCustomKategori">
          <label class="block text-sm font-bold text-gray-700 mb-1 mt-2">Kategori Baru</label>
          <input
            v-model="customKategori"
            type="text"
            placeholder="Contoh: Alat Tulis"
            class="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
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
