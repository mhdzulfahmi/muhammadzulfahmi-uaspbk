<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const menus = [
    {
        name: 'DASHBOARD',
        key: 'dashboard',
        submenus: [],
        path: 'dashboard'
    },
    {
        name: 'PRODUCT',
        key: 'product',
        submenus: [
            { name: 'Tambah product', path: 'addproduct' },
            { name: 'Daftar product', path: 'product' }
        ]
    },
    {
        name: 'TRANSAKSI',
        key: 'transaksi',
        submenus: [
            { name: 'Tambah Transaksi', path: 'addtransaksi' },
            { name: 'Daftar Transaksi', path: 'transaksi' }
        ]
    },
    {
        name: 'LAPORAN',
        key: 'laporan',
        submenus: [],
        path: 'laporan'
    }
]
</script>

<template>
    <aside
        class="w-64 min-h-screen fixed bg-gradient-to-b from-orange-100 via-yellow-50 to-amber-100 text-gray-800 shadow-md">
        <!-- Header Sidebar -->
        <div class="p-6 text-xl font-bold tracking-wide border-b border-sky-100 text-sky-700">
            🛒 Kedai Harian
        </div>

        <!-- Menu Navigasi -->
        <nav class="mt-4 px-3">
            <ul class="space-y-2">
                <li v-for="menu in menus" :key="menu.key">
                    <!-- Menu tanpa submenu -->
                    <div v-if="menu.submenus.length === 0">
                        <router-link :to="{ name: menu.path }"
                            class="block px-4 py-3 rounded-lg text-sm font-medium hover:bg-sky-100 transition" :class="{
                                'bg-sky-100 text-sky-700 font-semibold': route.name === menu.path
                            }">
                            {{ menu.name }}
                        </router-link>
                    </div>

                    <!-- Menu dengan submenu -->
                    <div v-else>
                        <div class="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider select-none">
                            {{ menu.name }}
                        </div>
                        <ul class="ml-4 space-y-1 border-l border-gray-200 pl-3">
                            <li v-for="submenu in menu.submenus" :key="submenu.path">
                                <router-link :to="{ name: submenu.path }"
                                    class="block px-3 py-2 rounded-md text-sm hover:bg-sky-100 transition" :class="{
                                        'bg-sky-100 text-sky-700 font-semibold': route.name === submenu.path
                                    }">
                                    {{ submenu.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    </aside>
</template>
