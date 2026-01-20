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
import Login from '@/views/Login/Login.vue';
import Register from '@/views/Register/Register.vue';
import Member from '@/views/Member/Member.vue';
import { useAuthStore } from '@/store/auth';
import EmailConfirmed from '@/views/Register/EmailConfirmed.vue';
import ForgotPassword from '@/views/Login/ForgotPassword.vue';
//後端串接測試用
import CTest from '@/views/HomePage/CoffeeSimulatorT1TTest.vue';
import ResetPassword from '@/views/Login/ResetPassword.vue';
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
        path: '/login',
        name: 'Login',
        component: Login,
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
        path: '/Email-confirmed',
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
    //測試用
    {
        path: '/cTest',
        name: 'CTest',
        component: CTest,
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
    if (authStore.isLoggedIn && (to.path === '/login' || to.path === '/register')) {
        return next({ name: 'HomePage' });
    }
    if (to.meta.requiresAdmin) {
        if (authStore.isLoggedIn && authStore.isAdmin) {
            next();
        }
        else {
            authStore.setBanner('請先登入帳號', 'warning');
            next(authStore.isLoggedIn ? { name: 'HomePage' } : { name: 'Login' });
        }
    }
    else if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        authStore.setBanner('請先登入帳號', 'warning');
        next({ name: 'Login' });
    }
    else {
        authStore.clearBanner();
        next();
    }
});
export default router;
