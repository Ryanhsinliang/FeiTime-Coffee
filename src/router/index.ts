import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Product from "@/views/Product.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import CoffeeIdIntroduction from "@/views/CoffeeIdIntroduction.vue";
import CoffeeIdTest from "@/views/CoffeeIdTest.vue";
const routes = [
  {
    path: "/", // URL 地址，使用者訪問此頁面時的路徑
    name: "HomePage", // 路由名稱，可用來程式跳頁（router.push({ name: "Home" })）
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
  {
    path: "/coffeeId-Introduction",
    name: "CoffeeIdIntroduction",
    component: CoffeeIdIntroduction,
  },
  {
    path: "/coffeeId-test",
    name: "CoffeeIdTest",
    component: CoffeeIdTest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
