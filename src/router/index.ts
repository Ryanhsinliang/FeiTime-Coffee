import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage/HomePage.vue';
import Product from '@/views/Product/Product.vue';
import ProductDetail from '@/views/ProductDetail/ProductDetail.vue';
import CoffeeIdTest from '@/views/CoffeeIdTest/CoffeeIdTest.vue';
import CoffeeSimulatorT1T from '@/views/CoffeeLabT1-T/CoffeeSimulatorT1T.vue';
import CoffeeSimulatorT1TP1 from '@/views/CoffeeLabT1-T-P1/CoffeeSimulatorT1TP1.vue';

const routes = [
  {
    path: '/', // URL 地址，使用者訪問此頁面時的路徑
    name: 'HomePage', // 路由名稱，可用來程式跳頁（router.push({ name: "Home" })）
    component: HomePage, // 對應的頁面元件，會渲染到 <router-view />
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
  {
    path: '/product-detail',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/coffee-id-test',
    name: 'CoffeeIdTest',
    component: CoffeeIdTest,
  },
  {
    path: '/coffeeLabT1-T',
    name: 'CoffeeLabT1-T',
    component: CoffeeSimulatorT1T,
  },
  {
    path: '/coffeeLabT1-T-P1',
    name: 'CoffeeLabT1-T-P1',
    component: CoffeeSimulatorT1TP1,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
