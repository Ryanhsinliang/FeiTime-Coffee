# ☕ FeiTime Coffee — UI/UX & 規範

## 字體（Typography）

- 內文：**LXGW WenKai TC**  
  [Google Fonts](https://fonts.google.com/specimen/LXGW+WenKai+TC)
- 字體大小：依 UI 設計調整
- 行高：1.4 ~ 1.6

**文字顏色：**

| 類型     | HEX     | 用途                   |
| -------- | ------- | ---------------------- |
| 標題     | #000000 | 主標題                 |
| 副標題   | #333333 | 章節標題               |
| 提示文字 | #666666 | placeholder / 輔助文字 |
| 禁用文字 | #AAAAAA | disabled 狀態          |

---

## 顏色主題（Color Palette）

來源：ColorHunt (https://colorhunt.co/palette/faf9eea2af9bdccfc0eeeeee)
[#FAF9EE, #A2AF9B, #DCCFC0, #EEEEEE]

| 名稱       | HEX     | RGB              | 用途            |
| ---------- | ------- | ---------------- | --------------- |
| Base       | #FAF9EE | rgb(250,249,238) | 整體背景        |
| Primary    | #A2AF9B | rgb(162,175,155) | 主按鈕 / 強調區 |
| Secondary  | #DCCFC0 | rgb(220,207,192) | 輔助按鈕 / 背景 |
| Light Gray | #EEEEEE | rgb(238,238,238) | 邊框 / 區塊淡底 |

# 🔹 Tailwind 預設狀態色碼（常用）

## 🔴 警示色 Danger / Error

| 功能             | Tailwind 顏色    | HEX       |
| ---------------- | ---------------- | --------- |
| 文字、icon       | `text-red-500`   | `#ef4444` |
| 按鈕、強調背景   | `bg-red-500`     | `#ef4444` |
| Hover            | `bg-red-600`     | `#dc2626` |
| 淺背景（提示框） | `bg-red-100`     | `#fee2e2` |
| 邊框             | `border-red-500` | `#ef4444` |

---

## 🟢 成功色 Success

| 功能             | Tailwind 顏色      | HEX       |
| ---------------- | ------------------ | --------- |
| 文字、icon       | `text-green-500`   | `#22c55e` |
| 按鈕、強調背景   | `bg-green-500`     | `#22c55e` |
| Hover            | `bg-green-600`     | `#16a34a` |
| 淺背景（提示框） | `bg-green-100`     | `#dcfce7` |
| 邊框             | `border-green-500` | `#22c55e` |

---

## 🟡 警告色 Warning（使用 amber，推薦）

| 功能             | Tailwind 顏色      | HEX       |
| ---------------- | ------------------ | --------- |
| 文字、icon       | `text-amber-500`   | `#f59e0b` |
| 按鈕、強調背景   | `bg-amber-500`     | `#f59e0b` |
| Hover            | `bg-amber-600`     | `#d97706` |
| 淺背景（提示框） | `bg-amber-100`     | `#fef3c7` |
| 邊框             | `border-amber-500` | `#f59e0b` |

---

## 命名規則（Naming Conventions）

| 類型                  | 命名規則   | 範例                 |
| --------------------- | ---------- | -------------------- |
| HTML / CSS / Tailwind | kebab-case | `product-card`       |
| TypeScript 變數       | camelCase  | `productName`        |
| Vue Component         | PascalCase | `CoffeeCard.vue`     |
| Assets（圖片/字體）   | kebab-case | `ethiopia-beans.jpg` |

---

## RWD 標準（Responsive Design）

| 裝置    | px       | Tailwind Class |
| ------- | -------- | -------------- |
| Desktop | ≥ 1024px | lg:            |
| Tablet  | ≥ 768px  | md:            |
| Mobile  | < 768px  | base           |

---

## Git Commit 規範

| 前綴      | 用途                   |
| --------- | ---------------------- |
| feat:     | 新功能                 |
| fix:      | 修 bug                 |
| docs:     | 文件更新               |
| style:    | 格式調整（不影響邏輯） |
| refactor: | 程式重構               |
| perf:     | 效能優化               |
| test:     | 測試新增或修改         |
| build:    | 打包 / CI / config     |
| chore:    | 雜項（套件、工具更新） |

範例：
feat: 新增商品列表 API 串接
fix: 修正 Coffee ID 測驗頁面跳轉錯誤
style: 調整首頁排版間距
