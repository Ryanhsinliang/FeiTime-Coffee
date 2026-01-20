import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import { VueReCaptcha } from 'vue-recaptcha-v3';
const pinia = createPinia();
// ----- 建立 Vue App -----
createApp(App)
    .use(router) // 安裝 router
    .use(pinia)
    .use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    loaderOptions: { autoHideBadge: true },
})
    .mount('#app'); // 掛載
