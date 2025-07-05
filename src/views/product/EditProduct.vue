<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore.js'

const router = useRouter()
const route = useRoute()
const store = useProductStore()

const id = route.params.id
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

onMounted(async () => {
  await store.getProducts()
  const product = store.findById(id)
  if (!product) return

  nama.value = product.nama
  kategori.value = kategoriOptions.includes(product.kategori) ? product.kategori : 'Lainnya'
  customKategori.value = kategori.value === 'Lainnya' ? product.kategori : ''
  harga.value = product.harga
  stok.value = product.stok
})

watch(kategori, (value) => {
  isCustomKategori.value = value === 'Lainnya'
})

const handleUpdate = async () => {
  const finalKategori = isCustomKategori.value ? customKategori.value.trim() : kategori.value

  if (!nama.value || !finalKategori || !harga.value) {
    alert('Semua field wajib diisi.')
    return
  }

  const updatedProduct = {
    nama: nama.value,
    kategori: finalKategori,
    harga: Number(harga.value),
    stok: Number(stok.value)
  }

  await store.updateProduct(id, updatedProduct)
  router.push({ name: 'product' })
}
</script>

<template>
  <div class="p-8 bg-gradient-to-br from-sky-50 via-white to-blue-50 min-h-screen">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Edit Produk</h1>
      <p class="text-gray-600 mt-2">Perbarui detail produk kedai harian Anda</p>
      <div class="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-3"></div>
    </div>

    <!-- Form -->
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <form @submit.prevent="handleUpdate" class="space-y-6">
        <!-- Nama -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Nama Produk</label>
          <input
            v-model="nama"
            type="text"
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

        <!-- Custom Kategori -->
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
            min="0"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <!-- Stok -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Stok</label>
          <input
            v-model="stok"
            type="number"
            min="0"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        <!-- Tombol -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Simpan Perubahan
          </button>
          <router-link
            :to="{ name: 'product' }"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg text-center transition duration-200"
          >
            Batal
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
