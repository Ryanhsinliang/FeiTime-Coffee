# ☕ Coffee E-Commerce Platform

**Vue 3 + TypeScript + Vite + Tailwind CSS**

本專案為咖啡商品電商平台，內含 Coffee ID 個人化風味測驗、沖煮參數模擬器，以及咖啡智能小助手（LLM 顧問）。  
此專案採用 Vue 3 + TypeScript 開發，並使用 Supabase 作為後端與資料庫。

---

## 📌 專案功能概述

### 🛒 核心功能

- 商品展示、分類、搜尋
- 商品詳細資訊頁
- 購物車與結帳流程
- 品牌與內容頁（品牌故事、內容行銷）
- 客服與支援

### 🔍 進階互動功能

- Coffee ID 個人化風味測驗
- 沖煮參數模擬器（粉水比 / 水溫 / 研磨粗細）
- 智能咖啡小助手（LLM）

---

## 🧱 技術架構（Tech Stack）

### 前端

- Vue 3 (Composition API)
- TypeScript
- Vite
- Tailwind CSS 3.4
- Font Awesome 6.7.2

### 後端 / 資料庫

- Supabase（PostgreSQL + Auth + Storage）

### 其他

- TDD（後續階段增加）
- Prettier + ESLint（格式化）

---

## 📁 專案結構

FEITIME-COFFEE/

- 📂 public/ # 靜態資源，不經打包

  - 🖼 favicon.ico # 網頁標籤小圖示
  - 📂 images/ # 靜態圖片
    - 📂 banner/ # 頁面大圖、輪播圖
      - 🖼 xxx-banner.jpg
      - 🖼 xxx-banner2.jpg
    - 📂 logo/ # 網站 logo
      - 🖼 coffee-logo.svg

- 📂 src/ # 專案主要程式碼

  - 📂 assets/ # 可 import 的資源

    - 📂 images/ # 商品圖片、頁面專用圖片
    - 📂 icons/ # Icon

  - 📂 components/ # 全站共用元件

    - 🧩 Header.vue
    - 🧩 Footer.vue
    - 📂 common/ # 通用元件 (Button / Card / Input)

  - 📂 views/ # 頁面組件

    - 📂 HomePage/
      - 📂 assets/ # HomePage 專屬資源
      - 🧩 HomePage.vue # 頁面
      - 📄 type.ts # HomePage 專屬型別
    - 📂 ProductPage/
      - 📂 assets/ # ProductPage 專屬資源
      - 🧩 ProductPage.vue # 頁面
      - 📄 type.ts # ProductPage 專屬型別
    - 📂 ProductDetail/
      - 📂 assets/ # ProductDetail 專屬資源
      - 🧩 ProductDetail.vue # 頁面
      - 📄 type.ts # ProductDetail 專屬型別
    - 📂 CoffeeIdTest/
      - 📂 assets/ # CoffeeIdTest 專屬資源
      - 🧩 CoffeeIdTest.vue # 頁面
      - 📄 type.ts # CoffeeIdTest 專屬型別

  - 📂 router/ # 路由設定

    - 📄 index.ts

  - 📂 store/ # Pinia 狀態管理

    - 🧩 auth.ts # token / 登入狀態
    - 🧩 cart.ts # 購物車資料

  - 📂 services/ # API 封裝

    - 📄 api.ts # axios instance & token 攔截器
    - 📄 productService.ts # Product 相關 API
    - 📄 authService.ts # Auth / Login / Register API

  - 📂 types/ # 共用 TypeScript 型別

    - 📄 index.d.ts # Product、CartItem 等

  - 📄 style.css # Tailwind 入口
  - 📄 global.css # 全站共用樣式 (body、按鈕、卡片等)
  - 🧩 App.vue
  - 📄 main.ts

- 📄 shims-vue.d.ts # 讓 TS 認得 .vue 檔案
- 📄 .env # 環境變數
- 📄 package.json # 專案依賴
- 📄 tailwind.config.js # Tailwind 配置
- 📄 vite.config.ts # Vite 配置
- 📄 prettier.config.cjs # Prettier 配置

---

## 🗂 Git 開發流程

### 專案開始（只做一次）

-說明: clone 專案下來--> 新增自己的分支 --> 切換到自己的分支

- git clone
- git branch memberA
- git checkout memberA

### 每天開發流程 (每次開發都要做)

-說明: 在自己本機完成修改 → commit → push 自己的分支到遠端（線上）

- git add .
- git commit -m "fix: 修正 Coffee ID 測驗頁面跳轉錯誤" (範例)
- git push origin memberA

### 將 main 合併到自己的分支（先不做，但會做想做的人之後可以做）

-說明: 切換到目前最新的主線上(main) --> 把最新主線拉下來 --> 切換到自己的分支 --> 將目前最新版的 main merge 到自己的分支上 --> 若有衝突可能需要解(這部分有不懂再問我) --> 順利解完衝突，你的分支就會有最新版的 main 內容(不會蓋到自己在分支做的東西)

- git checkout main
- git pull
- git checkout memberA
- git merge main

### git 大方向流程

1. 從 gitHub 拉專案下來到各自的本機
2. 各自開自己的分支出去做，不要在 main 上做 commit
3. 最後專案要準備收尾時，將所有分支合併回主線 (由一人做即可)

---

## ▶️ 如何開始

### 安裝 (只要是新拉下來的專案都要先做)

- npm install

### 開發模式

- npm run dev

### 打包 (這步先不用)

- npm run build

---

## 🔗 呼叫 API 流程

1. **存 token**：登入後把 Strapi token 存到 Pinia
2. **呼叫 API**：axios 攔截器從 Pinia 拿 token，自動帶到每個請求
3. **跨頁面共享**：所有頁面都可以拿到 token 或登入狀態，免去 prop 傳遞或事件傳遞

> 這樣就完全把 token、API、UI 分離，維護性高、擴充性也好。

### Pinia 想像

Pinia store 就像是一個 **全局抽屜**：  
你把需要共用的資料（token、購物車）放在裡面，  
任何組件都可以打開抽屜，拿資料或修改，修改後，抽屜裡的資料自動更新給所有使用它的組件。

---

詳細規格請看：  
➡ `/PROJECT_GUIDE.md`
