# 購物車登出處理 Implementation Plan

## 📋 目前狀態分析

### ✅ 已實作的功能

1. **登入時載入購物車**
   - `handleLogin()` (一般登入)：登入成功後會呼叫 `cartStore.loadCartFromStrapi()`
   - `App.vue` onMounted：如果使用者已登入，會同步購物車資料

2. **購物車同步機制**
   - 前端 Pinia Store (`cart.ts`) 有完整的 CRUD 操作
   - 後端 Express API (`cartController.ts`) 提供完整的購物車 API
   - 購物車資料會同步到 Strapi 資料庫

3. **清空購物車功能**
   - `clearCart()` 函數已實作，可以清空前後端購物車

### ❌ 發現的問題

1. **登出時沒有清空購物車**
   - `logout()` 函數只清除了 token、user、localStorage 和 cookies
   - 購物車資料仍然存在於 Pinia store 和 localStorage 中
   - 可能導致：
     - 其他使用者使用同一台電腦時看到前一個使用者的購物車
     - 使用者登出後再登入時看到舊的購物車資料（如果 App.vue 的 onMounted 沒有正確執行）

2. **Google 登入後沒有立即載入購物車**
   - `handleGoogleCallbackData()` 沒有呼叫 `loadCartFromStrapi()`
   - **問題說明**：
     - 普通登入 (`handleLogin`)：✅ 有明確呼叫 `loadCartFromStrapi()`，登入後立即載入購物車
     - Google 登入 (`handleGoogleCallbackData`)：❌ 沒有呼叫 `loadCartFromStrapi()`
     - `App.vue` 的 `onMounted`：✅ 會載入購物車，但**只在 App 初始化時執行一次**
     - **時序問題**：如果 App 已經 mounted，Google 登入後 `onMounted` 不會再執行，購物車可能不會載入

## 🎯 實作方案

### 方案 A：登出時清空購物車（推薦）

**優點：**
- 符合隱私和安全最佳實踐
- 避免不同使用者之間的資料混淆
- 實作簡單，只需修改 `logout()` 函數

**缺點：**
- 使用者登出後再登入時，購物車會被清空（但可以從 Strapi 重新載入）

**實作步驟：**
1. 修改 `FeiTime-Coffee/src/store/auth.ts` 的 `logout()` 函數
2. 在登出時呼叫 `cartStore.clearCart()` 清空購物車
3. 確保清空順序：先清空後端，再清空前端

### 方案 B：登出時保留購物車，登入時覆蓋

**優點：**
- 使用者登出後再登入時，購物車資料會從 Strapi 重新載入
- 不會遺失購物車資料

**缺點：**
- 不同使用者使用同一台電腦時，可能看到前一個使用者的購物車（直到登入）
- 需要確保登入時一定會載入購物車

**實作步驟：**
1. 保持 `logout()` 不變
2. 確保所有登入路徑都會載入購物車：
   - `handleLogin()` ✅ 已有
   - `handleGoogleCallbackData()` ❌ 需要新增
   - `App.vue` onMounted ✅ 已有

### 方案 C：混合方案（推薦）

**概念：**
- 登出時清空前端購物車（localStorage 和 Pinia state）
- 但不清空後端購物車（保留在 Strapi）
- 登入時從 Strapi 重新載入購物車

**優點：**
- 符合隱私和安全最佳實踐（前端清空）
- 保留使用者購物車資料（後端保留）
- 登入時自動恢復購物車

**缺點：**
- 需要實作「只清空前端」的功能

**實作步驟：**
1. 在 `cart.ts` 新增 `clearLocalCart()` 函數（只清空前端，不清空後端）
2. 修改 `logout()` 函數，呼叫 `clearLocalCart()`
3. 確保所有登入路徑都會載入購物車

## 📝 建議實作方案：方案 C（混合方案）

### 詳細實作步驟

#### Step 1: 修改 `cart.ts` - 新增 `clearLocalCart()` 函數

**檔案：** `FeiTime-Coffee/src/store/cart.ts`

**修改內容：**
```typescript
/**
 * 只清空前端購物車（localStorage 和 Pinia state）
 * 不清空後端購物車（保留在 Strapi）
 * 用於登出時清空前端資料，但保留後端資料供下次登入時載入
 */
function clearLocalCart() {
    items.value = [];
}

// 在 return 中新增
return {
    // ... 其他 exports
    clearLocalCart,
};
```

#### Step 2: 修改 `auth.ts` - 在 `logout()` 中清空購物車

**檔案：** `FeiTime-Coffee/src/store/auth.ts`

**修改內容：**
```typescript
function logout() {
    // 清空購物車（只清空前端，後端保留）
    const cartStore = useCartStore();
    cartStore.clearLocalCart();
    
    // 清除認證資訊
    token.value = null;
    user.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    Cookies.remove('auth_token');
}
```

#### Step 3: 修改 `auth.ts` - 在 Google 登入後載入購物車

**檔案：** `FeiTime-Coffee/src/store/auth.ts`

**問題說明：**
- **普通登入** (`handleLogin`)：✅ 第 53-55 行已有 `await cartStore.loadCartFromStrapi()`
- **Google 登入** (`handleGoogleCallbackData`)：❌ 第 141-157 行**沒有**呼叫 `loadCartFromStrapi()`
- **不一致性**：兩種登入方式行為不一致，Google 登入後購物車可能不會載入（除非 App 重新載入觸發 `onMounted`）

**修改內容：**
```typescript
function handleGoogleCallbackData(jwt: string, userData: User) {
    try {
        clearBanner();

        token.value = jwt;
        user.value = userData;

        Cookies.set('auth_token', jwt, { sameSite: 'strict' });
        localStorage.setItem('user', JSON.stringify(userData));

        // Google 登入成功後，從 Strapi 載入購物車（與普通登入保持一致）
        const cartStore = useCartStore();
        cartStore.loadCartFromStrapi();

        return { success: true };
    } catch (error: any) {
        const message = error.message || 'Google 登入處理失敗';
        setBanner(message, 'error');
        return { success: false, message };
    }
}
```

**注意：** 這裡不需要 `await`，因為 `loadCartFromStrapi()` 是異步的，但我們不需要等待它完成才返回成功。如果載入失敗，不會影響登入流程（只是購物車為空）。

#### Step 4: 確保 `clearCart()` 函數的正確性

**檔案：** `FeiTime-Coffee/src/store/cart.ts`

**檢查：**
- `clearCart()` 函數已經正確實作
- 會先清空後端，再清空前端
- 用於「完全清空購物車」的場景（例如：結帳後）

## 🔍 測試檢查清單

### 登出流程測試
- [ ] 登出時，前端購物車被清空（Pinia state 和 localStorage）
- [ ] 登出時，後端購物車保留（Strapi 資料庫）
- [ ] 登出後，購物車 UI 顯示為空

### 登入流程測試
- [ ] 一般登入後，購物車從 Strapi 載入
- [ ] Google 登入後，購物車從 Strapi 載入
- [ ] 登入後，購物車 UI 顯示正確的商品

### 多使用者測試
- [ ] 使用者 A 登出後，使用者 B 使用同一台電腦時，購物車為空
- [ ] 使用者 A 登出後再登入，購物車資料恢復

### 邊界情況測試
- [ ] 登出時網路錯誤，前端購物車仍被清空
- [ ] 登入時 Strapi 載入失敗，購物車為空（不應該顯示錯誤的資料）

## 📌 注意事項

1. **Pinia Persist 設定**
   - 購物車 Store 有 `persist` 設定，會自動保存到 localStorage
   - `clearLocalCart()` 清空 `items.value` 後，Pinia persist 會自動清除 localStorage 中的購物車資料

2. **後端 API 路由**
   - 後端已有 `DELETE /api/cart?userId=xxx` 路由（`clearUserCart`）
   - 但我們不會在登出時使用它，因為要保留後端資料

3. **錯誤處理**
   - `clearLocalCart()` 不需要錯誤處理（只是清空前端 state）
   - `loadCartFromStrapi()` 已有錯誤處理

4. **時序問題**
   - Google 登入是同步的，所以可以直接在 `handleGoogleCallbackData` 中呼叫 `loadCartFromStrapi()`
   - 如果載入失敗，不會影響登入流程（只是購物車為空）

## 🚀 實作優先順序

1. **高優先級**：實作 `clearLocalCart()` 和修改 `logout()`
   - 解決登出時購物車不清空的問題
   - 確保使用者隱私和安全

2. **中優先級**：修改 `handleGoogleCallbackData()` 載入購物車
   - **修復不一致性**：目前普通登入會載入購物車，但 Google 登入不會
   - 確保 Google 登入後購物車正確載入
   - 與一般登入行為保持一致

3. **低優先級**：測試和優化
   - 完整測試各種場景
   - 優化錯誤處理和用戶體驗

## 📚 相關檔案清單

### 需要修改的檔案
1. `FeiTime-Coffee/src/store/cart.ts` - 新增 `clearLocalCart()` 函數
2. `FeiTime-Coffee/src/store/auth.ts` - 修改 `logout()` 和 `handleGoogleCallbackData()`

### 不需要修改的檔案（但需要確認）
1. `FeiTime-Coffee/src/components/Header.vue` - 登出按鈕已正確呼叫 `logout()`
2. `FeiTime-Coffee/src/App.vue` - onMounted 已正確載入購物車
3. `feiTime-expressmode/src/controllers/cartController.ts` - 後端 API 已完整

## ✅ 完成標準

- [ ] 登出時前端購物車被清空
- [ ] 登出時後端購物車保留
- [ ] Google 登入後購物車正確載入
- [ ] 所有測試通過
- [ ] 程式碼符合專案規範
