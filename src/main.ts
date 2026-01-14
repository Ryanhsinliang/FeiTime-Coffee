import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css';
import App from './App.vue';
import router from './router';
import { VueReCaptcha } from 'vue-recaptcha-v3';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // 啟用 Pinia 持久化插件 (npm install pinia-plugin-persistedstate)

// ----- 建立 Vue App -----
createApp(App)
  .use(router) // 安裝 router
  .use(pinia)  // 安裝 Pinia
  .use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    loaderOptions: { autoHideBadge: true },
  })
  .mount('#app'); // 掛載
