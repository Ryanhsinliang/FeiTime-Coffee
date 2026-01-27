import { createRouter, createWebHistory } from 'vue-router';
import Intro from '@/views/HomePage/Intro.vue';
import HomePage from '@/views/HomePage/HomePage.vue';
import AboutUs from '@/views/Story/Story.vue';
import Product from '@/views/Product/Product.vue';
import ProductDetail from '@/views/ProductDetail/ProductDetail.vue';
import CoffeeIdTest from '@/views/CoffeeIdTest/CoffeeIdTest.vue';
import CoffeeIdTestCard from '@/views/CoffeeIdTest/CoffeeIdTestCard.vue';
import CoffeeSimulatorT1T from '@/views/CoffeeLabT1-T/CoffeeSimulatorT1T.vue';
import CoffeeSimulatorT1TP1 from '@/views/CoffeeLabT1-T-P1/CoffeeSimulatorT1TP1.vue';
import UltraCoffeeSimulator from '@/views/UltraCoffeeSimulator/UltraCoffeeSimulator.vue';
import RefineSimulator from '@/views/RefineSimulator/RefineSimulator.vue';
import Login from '@/views/Login/Login.vue';
import Register from '@/views/Register/Register.vue';
import Member from '@/views/Member/Member.vue';
import { useAuthStore } from '@/store/auth';
import EmailConfirmed from '@/views/Register/EmailConfirmed.vue';
import ForgotPassword from '@/views/Login/ForgotPassword.vue';
import ResetPassword from '@/views/Login/ResetPassword.vue';
import GoogleCallback from '@/views/Login/GoogleCallback.vue';
import Admin from '@/views/Admin/Admin.vue';
import AdminOrders from '@/views/Admin/Orders.vue';
import AdminOrderDetail from '@/views/Admin/OrderDetail.vue';
import AdminStocks from '@/views/Admin/Stocks.vue';
import AdminStockDetail from '@/views/Admin/StockDetail.vue';
import AdminCreateProduct from '@/views/Admin/CreateProduct.vue';
import AdminUsers from '@/views/Admin/AdminUsers.vue';
import AdminUserMe from '@/views/Admin/AdminUserMe.vue';
import AdminUserDetail from '@/views/Admin/AdminUserDetail.vue';
import Checkout from '@/views/Checkout/Checkout.vue';
import PayCancel from '@/views/PayCancel.vue';
import PaySuccess from '@/views/PaySuccess.vue';
import PayWait from '@/views/PayWait.vue';

const routes = [
  {
    path: '/', // URL 地址，使用者訪問此頁面時的路徑
    name: 'Intro', // 路由名稱，可用來程式跳頁（router.push({ name: "HomePage" })）
    component: Intro, // 對應的頁面元件，會渲染到 <router-view />
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
  {
    path: '/product-detail/:pid',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/coffee-id-test',
    name: 'CoffeeIdTest',
    component: CoffeeIdTest,
  },
  {
    path: '/coffee-id-test-card',
    name: 'CoffeeIdTestCard',
    component: CoffeeIdTestCard,
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
  {
    path: '/UltraCoffeeSimulator',
    name: 'UltraCoffeeSimulator',
    component: UltraCoffeeSimulator,
  },
  {
    path: '/refine-simulator',
    name: 'RefineSimulator',
    component: RefineSimulator,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/auth/google/callback',
    name: 'GoogleCallback',
    component: GoogleCallback,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/member',
    name: 'Member',
    component: Member,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAdmin: true },
    children: [
      // 訂單
      {
        path: 'orders',
        name: 'AdminOrders',
        component: AdminOrders,
      },
      {
        path: 'orders/:order_number',
        name: 'AdminOrderDetail',
        component: AdminOrderDetail,
        props: true,
      },

      // 庫存
      {
        path: 'stocks',
        name: 'AdminStocks',
        component: AdminStocks,
      },
      {
        path: 'stocks/:pid',
        name: 'AdminStockDetail',
        component: AdminStockDetail,
      },
      {
        path: 'stocks/new',
        name: 'AdminCreateProduct',
        component: AdminCreateProduct,
      },

      // 使用者
      {
        path: 'users',
        name: 'AdminUsers',
        component: AdminUsers,
      },
      {
        path: 'users/me',
        name: 'AdminUserMe',
        component: AdminUserMe,
      },
      {
        path: 'users/:id',
        name: 'AdminUserDetail',
        component: AdminUserDetail,
        props: true,
      },
    ],
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requiresAuth: true },
  },

  {
    path: '/payment-cancel',
    name: 'payment-cancel',
    component: PayCancel,
    meta: { requiresAuth: true },
  },

  {
    path: '/payment-wait',
    name: 'payment-wait',
    component: PayWait,
    meta: { requiresAuth: true },
  },

  {
    path: '/payment-success',
    name: 'payment-success',
    component: PaySuccess,
    meta: { requiresAuth: true },
  },

  {
    path: '/email-confirmed',
    name: 'EmailConfirmed',
    component: EmailConfirmed,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  // 🎯 頁面切換時永遠回到頂部
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  console.log(`正在前往: ${to.path}, 登入狀態: ${authStore.isLoggedIn}`);

  if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/register')) {
    return next({ name: 'HomePage' });
  }
  if (to.meta.requiresAdmin) {
    if (authStore.isLoggedIn && authStore.isAdmin) {
      next();
    } else {
      authStore.setBanner('請先登入帳號', 'warning');
      next(authStore.isLoggedIn ? { name: 'HomePage' } : { name: 'Login' });
    }
  } else if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    authStore.setBanner('請先登入帳號', 'warning');
    next({ name: 'Login' });
  } else {
    authStore.clearBanner();
    next();
  }
});
export default router;
