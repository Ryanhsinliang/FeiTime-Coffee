import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './router';

const pinia = createPinia();
// ----- 建立 Vue App -----
createApp(App)
  .use(router) // 安裝 router
  .use(pinia)
  .mount('#app'); // 掛載
