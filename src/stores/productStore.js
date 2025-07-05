import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: []
    }),

    getters: {
        // Produk dengan stok lebih dari 0
        tersedia(state) {
            return state.products.filter(p => p.stok > 0)
        },

        // Produk berdasarkan kategori
        byKategori: (state) => (kategori) => {
            if (!kategori || kategori === 'Semua') return state.products
            return state.products.filter(p => p.kategori.toLowerCase() === kategori.toLowerCase())
        },

        // Temukan produk berdasarkan ID
        findById: (state) => (id) => {
            return state.products.find(p => p.id === id)
        }
    },

    actions: {
        // Ambil semua produk
        async getProducts() {
            try {
                const res = await axios.get('https://nosy-working-equipment.glitch.me/product')
                this.products = res.data
            } catch (error) {
                console.error('Gagal mengambil data produk:', error)
            }
        },

        // Tambah produk baru
        async addProduct(product) {
            try {
                await this.getProducts()
                const maxId = this.products.length > 0
                    ? Math.max(...this.products.map(p => parseInt(p.id)))
                    : 0

                const newProduct = { id: String(maxId + 1), ...product }
                const res = await axios.post('https://nosy-working-equipment.glitch.me/product', newProduct)
                this.products.push(res.data)
            } catch (error) {
                console.error('Gagal menambahkan produk:', error)
            }
        },

        // Update produk
        async updateProduct(id, updatedData) {
            try {
                await axios.put(`https://nosy-working-equipment.glitch.me/product/${id}`, updatedData)
                const index = this.products.findIndex(p => p.id === id)
                if (index !== -1) {
                    this.products[index] = { id, ...updatedData }
                }
            } catch (error) {
                console.error('Gagal memperbarui produk:', error)
            }
        },

        // Hapus produk
        async deleteProduct(id) {
            try {
                await axios.delete(`https://nosy-working-equipment.glitch.me/product/${id}`)
                this.products = this.products.filter(p => p.id !== id)
            } catch (error) {
                console.error('Gagal menghapus produk:', error)
            }
        }
    }
})
