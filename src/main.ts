import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';
import piniaPersist from 'pinia-plugin-persistedstate';
import { VueReCaptcha } from 'vue-recaptcha-v3';

const pinia = createPinia()
pinia.use(piniaPersist);
createApp(App)
  .use(router) // 安裝 router
  .use(pinia)
  .use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    loaderOptions: { autoHideBadge: true },
  })
  .mount('#app'); // 掛載
