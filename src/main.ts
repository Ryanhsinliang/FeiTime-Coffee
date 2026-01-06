import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

const pinia = createPinia().use(piniaPersist);
// ----- 建立 Vue App -----
createApp(App)
  .use(router) // 安裝 router
  .use(pinia) // 安裝 Pinia
  .mount('#app'); // 掛載
