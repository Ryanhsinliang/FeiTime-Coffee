import { createRouter, createWebHistory } from 'vue-router';
import Intro from '@/views/HomePage/Intro.vue';
import HomePage from '@/views/HomePage/HomePage.vue';
import Product from '@/views/Product/Product.vue';
import ProductDetail from '@/views/ProductDetail/ProductDetail.vue';
import CoffeeIdTest from '@/views/CoffeeIdTest/CoffeeIdTest.vue';
import CoffeeIdTestCard from '@/views/CoffeeIdTest/CoffeeIdTestCard.vue';
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
import PayCancel from '@/views/Checkout/PayCancel.vue';
import PaySuccess from '@/views/Checkout/PaySuccess.vue';
import PayWait from '@/views/Checkout/PayWait.vue';

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
    meta: { title: '首頁' },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { title: '商品' },
  },
  {
    path: '/product-detail/:pid',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { title: '產品詳情' },
  },
  {
    path: '/coffee-id-test',
    name: 'CoffeeIdTest',
    component: CoffeeIdTest,
    meta: { title: 'CoffeeID測驗' },
  },
  {
    path: '/coffee-id-test-card',
    name: 'CoffeeIdTestCard',
    component: CoffeeIdTestCard,
    meta: { title: 'CoffeeID測驗' },
  },
  {
    path: '/UltraCoffeeSimulator',
    name: 'UltraCoffeeSimulator',
    component: UltraCoffeeSimulator,
    meta: { title: '咖啡沖煮模擬器' },
  },
  {
    path: '/refine-simulator',
    name: 'RefineSimulator',
    component: RefineSimulator,
    meta: { title: '進階模擬器' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登入' },
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
    meta: { title: '註冊' },
  },
  {
    path: '/member',
    name: 'Member',
    component: Member,
    meta: { requiresAuth: true, title: '會員專區' },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAdmin: true, title: '後台管理' },
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

  // --- 設定瀏覽器標題邏輯 ---
  const siteName = 'FeiTime';
  const pageTitle = to.meta.title as string;
  document.title = pageTitle ? `${siteName} - ${pageTitle}` : siteName;
  // ------------------------------

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
    // 路由守衛 (Router Guard)
  } else if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    authStore.setBanner('請先登入帳號', 'warning');
    next({ name: 'Login' }); // 強制跳轉到登入頁
  } else {
    authStore.clearBanner();
    next();
  }
});

export default router;
