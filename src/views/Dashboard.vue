<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore.js'

const store = useProductStore()
const isLoading = ref(false)

// Statistik
const totalProduk = computed(() => store.products.length)
const totalStok = computed(() =>
    store.products.reduce((acc, item) => acc + Number(item.stok), 0)
)
const totalKategori = computed(() => {
    const unique = new Set(store.products.map(p => p.kategori))
    return unique.size
})

// Ringkasan stok sedikit
const ambangStok = 20
const stokSedikit = computed(() =>
    store.products.filter(p => Number(p.stok) < ambangStok)
)

onMounted(async () => {
    isLoading.value = true
    await store.getProducts()
    isLoading.value = false
})
</script>

<template>
    <div class="p-8 w-full bg-gradient-to-br from-sky-50 via-white to-blue-50 min-h-screen">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p class="text-gray-600 mt-2">Ringkasan Kedai Harian</p>
            <div class="w-20 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-3"></div>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="flex items-center justify-center py-12 text-blue-600">
            <svg class="animate-spin h-6 w-6 mr-3 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Memuat data dashboard...
        </div>

        <!-- Statistik -->
        <div v-else>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <!-- Card -->
                <div
                    class="bg-gradient-to-br from-sky-100 to-white border border-sky-200 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
                    <h3 class="text-sm font-semibold uppercase text-sky-700 mb-2 tracking-wide">Total Produk</h3>
                    <p class="text-4xl font-extrabold text-gray-800">{{ totalProduk }}</p>
                </div>

                <div
                    class="bg-gradient-to-br from-sky-100 to-white border border-sky-200 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
                    <h3 class="text-sm font-semibold uppercase text-sky-700 mb-2 tracking-wide">Total Stok</h3>
                    <p class="text-4xl font-extrabold text-gray-800">{{ totalStok }}</p>
                </div>

                <div
                    class="bg-gradient-to-br from-sky-100 to-white border border-sky-200 shadow rounded-xl p-6 text-center hover:shadow-lg transition">
                    <h3 class="text-sm font-semibold uppercase text-sky-700 mb-2 tracking-wide">Kategori</h3>
                    <p class="text-4xl font-extrabold text-gray-800">{{ totalKategori }}</p>
                </div>
            </div>

            <!-- RINGKASAN STOK SEDIKIT -->
            <div class="bg-white shadow rounded-lg border border-sky-200 p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-1">
                    Produk Stok Rendah
                </h2>
                <div class="w-28 h-1 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mb-4"></div>

                <p class="text-sm text-gray-500 mb-4">
                    Menampilkan produk dengan stok di bawah {{ ambangStok }}
                </p>

                <div v-if="stokSedikit.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div v-for="item in stokSedikit" :key="item.id"
                        class="bg-gradient-to-br from-white to-sky-50 border border-sky-100 shadow hover:shadow-lg rounded-lg p-4 flex flex-col justify-between transition">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 mb-1">
                                {{ item.nama }}
                            </h3>
                            <span
                                class="inline-block bg-sky-100 text-sky-700 text-xs font-medium px-2 py-1 rounded-full mb-2">
                                {{ item.kategori }}
                            </span>
                        </div>
                        <div class="mt-2">
                            <span
                                class="inline-block bg-gradient-to-br from-red-200 to-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-sm shadow">
                                Stok: {{ item.stok }}
                            </span>
                        </div>
                    </div>
                </div>

                <div v-else class="text-gray-500 text-center py-6">
                    ✅ Semua produk aman! Stok cukup.
                </div>
            </div>

        </div>
    </div>
</template>
