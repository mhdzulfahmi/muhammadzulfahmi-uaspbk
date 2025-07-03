import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Laporan from "@/views/Laporan.vue";
import transaksiRouter from "./TransaksiRouter.js";
import productRouter from "./ProductRouter.js";

const BaseRouter = [
    {path: '/', name:'dashboard', component: Dashboard},
    {path: '/laporan', name:'laporan', component: Laporan},
]

const routes = [
    ...BaseRouter,
    ...productRouter,
    ...transaksiRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;