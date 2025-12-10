import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage/HomePage.vue';
import Product from '@/views/Product/Product.vue';
import ProductDetail from '@/views/ProductDetail/ProductDetail.vue';
import CoffeeIdTest from '@/views/CoffeeIdTest/CoffeeIdTest.vue';
import CoffeeSimulator from '@/views/CoffeeSimulator/CoffeeSimulator.vue';
import Login from '@/views/Login/Login.vue';
import Member from '@/views/Member/Member.vue';

const routes = [
  {
    path: '/', // URL 地址，使用者訪問此頁面時的路徑
    name: 'HomePage', // 路由名稱，可用來程式跳頁（router.push({ name: "HomePage" })）
    component: HomePage, // 對應的頁面元件，會渲染到 <router-view />
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/product-detail",
    name: "ProductDetail",
    component: ProductDetail,
  },
<<<<<<< HEAD
=======
  {
    path: '/coffee-id-test',
    name: 'CoffeeIdTest',
    component: CoffeeIdTest,
  },
  {
    path: '/coffee-simulator',
    name: 'CoffeeSimulator',
    component: CoffeeSimulator,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/member',
    name: 'Member',
    component: Member,
  },
>>>>>>> main
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
