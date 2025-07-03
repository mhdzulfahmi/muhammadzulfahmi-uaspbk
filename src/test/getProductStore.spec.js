import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '@/stores/productStore'


describe('Product Store Getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const dummyProducts = [
    { id: '1', nama: 'Gula', kategori: 'Kebutuhan Pokok', stok: 10 },
    { id: '2', nama: 'Garam', kategori: 'Kebutuhan Pokok', stok: 0 },
    { id: '3', nama: 'Minyak', kategori: 'Bumbu', stok: 5 },
    { id: '4', nama: 'Teh', kategori: 'Minuman', stok: 0 },
  ]

  it('getter "tersedia" harus mengembalikan produk dengan stok > 0', () => {
    const store = useProductStore()
    store.products = dummyProducts

    const result = store.tersedia
    expect(result).toHaveLength(2)
    expect(result.map(p => p.nama)).toEqual(expect.arrayContaining(['Gula', 'Minyak']))
  })

  it('getter "byKategori" harus mengembalikan semua jika kategori adalah "Semua"', () => {
    const store = useProductStore()
    store.products = dummyProducts

    const result = store.byKategori('Semua')
    expect(result).toHaveLength(dummyProducts.length)
  })

  it('getter "byKategori" harus mengembalikan produk sesuai kategori (case-insensitive)', () => {
    const store = useProductStore()
    store.products = dummyProducts

    const result = store.byKategori('bumbu')
    expect(result).toHaveLength(1)
    expect(result[0].nama).toBe('Minyak')
  })

  it('getter "findById" harus mengembalikan produk sesuai ID', () => {
    const store = useProductStore()
    store.products = dummyProducts

    const result = store.findById('3')
    expect(result).toBeDefined()
    expect(result.nama).toBe('Minyak')
  })

  it('getter "findById" harus mengembalikan undefined jika ID tidak ditemukan', () => {
    const store = useProductStore()
    store.products = dummyProducts

    const result = store.findById('99')
    expect(result).toBeUndefined()
  })
})
