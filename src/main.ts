import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router) // 安裝 router
  .mount("#app"); // 掛載
