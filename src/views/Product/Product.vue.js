import { getProducts } from '../../services/product';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// 手機板 切換topbar 、旋轉按鈕 、更改商品卡 grid 的上距 避免留白
const sortTopbar = ref(true);
const rotation = ref('');
const topBarSapce = ref('pt-[500px]');
const sortBarSwitch = () => {
    sortTopbar.value = !sortTopbar.value;
    if (!sortTopbar.value) {
        rotation.value = 'rotate-180';
        topBarSapce.value = 'pt-[50px]';
    }
    else {
        rotation.value = '';
        topBarSapce.value = 'pt-[550px]';
    }
};
const productCopy = ref([]); // 備份資料 【排序】功能使用
const product = ref([]);
// <DataRule[]>	為TS語法 規範 productCopy 、product 是符合 DataRule 規格的陣列
const loading = ref(true); // 用來調整讀取中圖片是否呈現
const err = ref(''); // 放錯誤訊息
// API(get)函數
const getcoffee = async (filterData = {}) => {
    // filterData是參數 它是一個物件
    // : any  為TS的語法 代表不限制物件裡面的型別
    try {
        err.value = ''; // 每次重新請求前清空錯誤
        const res = await getProducts(filterData);
        const apiFormData = res.data || res;
        product.value = apiFormData;
        productCopy.value = [...apiFormData]; // 預先準備一個備份資料 之後排序、搜尋時使用
        if (productCopy.value) {
            loading.value = false;
        }
    }
    catch (error) {
        err.value = error.message;
        console.error('API 串接出錯：', error);
    }
};
// 排序相關
const sortWhich = ref(''); // 雙向綁定下拉式選單用的變數 依據它來決定現在要排序什麼
const sortHe = ref(true); // 決定高到低 還是 低到高 的參數 預設true是 高到低
const doSort = () => {
    // 切換 高到低 低到高 的函數 我選擇在前端做
    if (!sortWhich.value)
        return; // 如果沒有sortWhich.value 就不做以下的事 相當於if(sortWhich.value){...} 但這樣比較簡潔
    const field = sortWhich.value; // 取出這次要排序的東西 例如價錢
    // as keyof DataRule  保證 field 一定是 DataRule 裡的其中一個 並且用對應的型別
    const sorted = [...productCopy.value].sort((a, b) => {
        // [...productCopy.value] 是把元陣列炸開再裝進另一個陣列 這樣不會修改到初始資料
        // 在JS sort()中的callback 可帶兩個參數a b 表示隨機取樣比對時的那兩個元素
        let vA = Number(a[field]) || 0; // a 為陣列中的其中一個元素 在這就是其中一包商品的物件 a[field] 就像object.price的意思
        let vB = Number(b[field]) || 0; // b 同理 a
        let result;
        if (sortHe.value === true) {
            // 依據 sortHe 來調整是 高到低 還是 低到高
            result = vB - vA; // 高到低
        }
        else {
            result = vA - vB; // 低到高
        }
        return result;
    });
    product.value = sorted; // 把這一次排序的陣列 放到product 讓它來渲染畫面
};
const takeSort = async () => {
    // 當使用下拉式選單 執行排序的函數
    if (!sortWhich.value)
        return;
    try {
        await getcoffee({ sort: [`${sortWhich.value}:desc`] }); // 抓取一個依照 sortWhich 高到低排序的產品陣列 sortWhich可能是 價錢、人氣度...
        // 依照 getcoffee () 抓到的資料會丟進 product 這個ref()變數
        productCopy.value = [...product.value]; // 用 productCopy 抓取 product 但怕共享同一個陣列 所以先炸開再用[] 確保它是新的陣列
        sortHe.value = true; // 預設抓完後是 高到低
        doSort(); // 執行一次排序來渲染頁面
        console.log('選單觸發成功，目前資料類別：', sortWhich.value);
    }
    catch (err) {
        console.error('選單排序失敗', err);
    }
};
const sortChange = () => {
    // 切換頁面 高到低 低到高 的函數
    sortHe.value = !sortHe.value;
    doSort();
};
// 搜尋相關
const findWord = ref(''); // 雙向綁定輸入框的變數
const cannotFind = ref(false); // 製作變數來控制【搜尋不到】的CSS樣式是否生成 預設先不要出現
const find = (word) => {
    product.value = [...productCopy.value];
    const allCoffee = [...product.value]; // 複製一份全部產品的陣列
    const found = allCoffee.filter((obj) => {
        return obj.name.includes(word);
    });
    product.value = found;
    if (found.length == 0) {
        cannotFind.value = true;
    }
    else {
        cannotFind.value = false;
    }
};
// 前端路由
const router = useRouter();
const goProduct = (type, val) => {
    router.push({
        path: '/product',
        query: { [type]: val }, // 把網址變成類似 ?origin=Brazil 這樣的型式
    });
};
const route = useRoute();
const first = () => {
    // 把網址上的參數 (route.query) 帶到 API 函數
    // 預留一個地方處理route.query (若之後需傳遞數字的話 要在這邊轉型)
    getcoffee(route.query);
};
watch(
// 如果網址變了 (按了新按鈕)  要重新抓資料
() => route.query, // watch要監視物件裡的值 需要套一層函數 否則它是監視整個物件 而非裡面的值
() => {
    first();
}, { immediate: true } // 載入頁面時 馬上執行一次來顯示全部產品
);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "font-wenkai text-[#222222]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "top-find-bar" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.sortTopbar) }, null, null);
// @ts-ignore
[sortTopbar,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "mb-[12px] mx-[3%] flex justify-center relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative lg:justify-center lg:w-[70%] md:w-[80%] md:justify-center w-[94%] flex justify-start" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.input)({
    ...{ onKeyup: (...[$event]) => {
            __VLS_ctx.find(__VLS_ctx.findWord);
            // @ts-ignore
            [find, findWord,];
        } },
    ...{ class: "border-2 border-solid border-[#8f745c] lg:text-[24px] lg:py-[12px] lg:px-[24px] lg:rounded-[12px] lg:w-[100%] md:text-[20px] md:py-[8px] md:px-[24px] md:rounded-[12px] md:w-[100%] text-[20px] py-[8px] px-[18px] rounded-[8px] w-[90%]" },
    type: "search",
    placeholder: "喝一杯靜謐的午後時光",
});
(__VLS_ctx.findWord);
// @ts-ignore
[findWord,];
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "sort flex absolute md:top-[calc(100%+64px)] md:left-[24px] whitespace-nowrap lg:top-[calc(100%+8px)] lg:right-[24px] lg:left-auto" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "sort-list flex bg-[var(--main-color)] px-[12px] rounded-[8px] overflow-hidden mr-[8px]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    ...{ class: "IC-sort w-[32px] bg-[var(--main-color)]" },
    src: "./assets/sort.svg",
    alt: "",
});
__VLS_asFunctionalElement(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    ...{ onChange: (__VLS_ctx.takeSort) },
    value: (__VLS_ctx.sortWhich),
    id: "sort-page",
    ...{ class: "bg-[var(--main-color)] pl-[16px] pr-[8px] cursor-pointer shrink-0" },
});
// @ts-ignore
[takeSort, sortWhich,];
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "price",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "popularity",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "sweetness",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "acidity",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "body",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "aftertaste",
});
__VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
    value: "clarity",
});
if (__VLS_ctx.sortHe) {
    // @ts-ignore
    [sortHe,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ onClick: (__VLS_ctx.sortChange) },
        ...{ class: "oriru rounded-[4px] bg-[#bdeda4] leading-8 px-[6px]" },
    });
    // @ts-ignore
    [sortChange,];
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ onClick: (__VLS_ctx.sortChange) },
        ...{ class: "noboru rounded-[4px] bg-[#a4e9e2] leading-8 px-[6px]" },
    });
    // @ts-ignore
    [sortChange,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "find lg:mx-[16.95%] md:mx-[12.4%] w-[70%] flex whitespace-nowrap" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter px-[16px] flex lg:w-[70%] md:w-[80%]" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-type" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "filter-word" },
    tabindex: "0",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "type-list" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('roast', 'Light');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Light",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('roast', 'Medium');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Medium",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('roast', 'Dark');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Dark",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-type" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "filter-word" },
    tabindex: "0",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "type-list" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('flavor_type', 'Fruity');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Fruity",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('flavor_type', 'Nutty');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Nutty",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('flavor_type', 'Bold');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Bold",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('flavor_type', 'Floral');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Floral",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-type" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "filter-word" },
    tabindex: "0",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "type-list" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('processing', 'Washed');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Washed",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('processing', 'Natural');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Natural",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('processing', 'Honey');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Honey",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('processing', 'Wet-Hulled');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Wet-Hulled",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "filter-type" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "filter-word" },
    tabindex: "0",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "big-list" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Ethiopia');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Ethiopia",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Kenya');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Kenya",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Rwanda');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Rwanda",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Burundi');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Burundi",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Colombia');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Colombia",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Brazil');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Brazil",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Guatemala');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Guatemala",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Costa Rica');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Costa Rica",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'El Salvador');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "El Salvador",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Panama');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Panama",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Indonesia');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Indonesia",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Vietnam');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Vietnam",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'India');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "India",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Thailand');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Thailand",
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.goProduct('origin', 'Papua New Guinea');
            // @ts-ignore
            [goProduct,];
        } },
    ...{ class: "list" },
    tabindex: "0",
    value: "Papua New Guinea",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.sortBarSwitch) },
    ...{ class: "somaho-up none" },
    ...{ class: (__VLS_ctx.rotation) },
});
// @ts-ignore
[sortBarSwitch, rotation,];
__VLS_asFunctionalElement(__VLS_intrinsics.i, __VLS_intrinsics.i)({
    ...{ class: "fa-solid fa-angle-up" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid lg:grid-cols-3 lg:mx-[3%] lg:w-[94%] lg:gap-[80px] lg:pt-[258px] md:mx-[6%] md:w-[88%] md:gap-[60px] md:grid-cols-2 md:pt-[272px] mx-[6%] w-[88%] gap-[60px] grid-cols-1" },
    ...{ class: (__VLS_ctx.topBarSapce) },
});
// @ts-ignore
[topBarSapce,];
for (const [p] of __VLS_getVForSourceType((__VLS_ctx.product))) {
    // @ts-ignore
    [product,];
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: ({ name: 'ProductDetail', params: { pid: p.pid } }),
        key: (p.pid),
    }));
    const __VLS_2 = __VLS_1({
        to: ({ name: 'ProductDetail', params: { pid: p.pid } }),
        key: (p.pid),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "relative" },
    });
    if (p.img && p.img.length > 0) {
        __VLS_asFunctionalElement(__VLS_intrinsics.img)({
            ...{ class: "w-[100%] aspect-[1/1.2] object-cover object-center" },
            src: (p.img[0].formats.large.url),
            alt: (p.name),
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.img)({
            src: "",
            alt: "暫無圖片",
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex flex-col items-center absolute w-[100%] bottom-[24px] left-[50%] text-[20px] -translate-x-[50%] opacity-[0.75]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "bg-[var(--soft-brown)] py-[2px] px-[8px] rounded-[8px]" },
    });
    (p.origin);
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-[28px] font-bold bg-[var(--main-color)] py-[2px] px-[8px] my-[12px] rounded-[8px]" },
    });
    (p.name);
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "bg-[var(--light-gray)] py-[2px] px-[8px] rounded-[8px]" },
    });
    (p.price);
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex w-full justify-center mb-[100px]" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
// @ts-ignore
[loading,];
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    ...{ class: "w-[35%]" },
    src: "./assets/w.png",
    alt: "正在為您準備咖啡清單...",
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex w-full justify-center mb-[100px]" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.cannotFind) }, null, null);
// @ts-ignore
[cannotFind,];
__VLS_asFunctionalElement(__VLS_intrinsics.img)({
    ...{ class: "w-[35%]" },
    src: "./assets/sagashinai.png",
    alt: "找不到符合的商品",
});
/** @type {__VLS_StyleScopedClasses['font-wenkai']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#222222]']} */ ;
/** @type {__VLS_StyleScopedClasses['top-find-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-[3%]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-[70%]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[80%]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[94%]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['border-[#8f745c]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:text-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:py-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:rounded-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:rounded-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[18px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[90%]']} */ ;
/** @type {__VLS_StyleScopedClasses['sort']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['md:top-[calc(100%+64px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:left-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:top-[calc(100%+8px)]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:right-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:left-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['sort-list']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--main-color)]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['IC-sort']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[32px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--main-color)]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--main-color)]']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['oriru']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[4px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#bdeda4]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-8']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[6px]']} */ ;
/** @type {__VLS_StyleScopedClasses['noboru']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[4px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#a4e9e2]']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-8']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[6px]']} */ ;
/** @type {__VLS_StyleScopedClasses['find']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:mx-[16.95%]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:mx-[12.4%]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[70%]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['filter']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[16px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-[70%]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[80%]']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-type']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-word']} */ ;
/** @type {__VLS_StyleScopedClasses['type-list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-type']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-word']} */ ;
/** @type {__VLS_StyleScopedClasses['type-list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-type']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-word']} */ ;
/** @type {__VLS_StyleScopedClasses['type-list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-type']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-word']} */ ;
/** @type {__VLS_StyleScopedClasses['big-list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['somaho-up']} */ ;
/** @type {__VLS_StyleScopedClasses['none']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-solid']} */ ;
/** @type {__VLS_StyleScopedClasses['fa-angle-up']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:mx-[3%]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:w-[94%]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:gap-[80px]']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:pt-[258px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:mx-[6%]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-[88%]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-[60px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['md:pt-[272px]']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-[6%]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[88%]']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-[60px]']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[1/1.2]']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['object-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[100%]']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-[24px]']} */ ;
/** @type {__VLS_StyleScopedClasses['left-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[20px]']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-[50%]']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-[0.75]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--soft-brown)]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[2px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[28px]']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--main-color)]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[2px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['my-[12px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[var(--light-gray)]']} */ ;
/** @type {__VLS_StyleScopedClasses['py-[2px]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[8px]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-[100px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[35%]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-[100px]']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[35%]']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
