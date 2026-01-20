import { ref } from "vue";
import { geminiText } from "../services/geminiClient";
const loading = ref(false);
const text = ref("");
const error = ref("");
async function run() {
    loading.value = true;
    text.value = "";
    error.value = "";
    try {
        text.value = await geminiText("用一句話解釋：什麼是手沖咖啡的悶蒸？");
    }
    catch (e) {
        error.value = e?.message ?? String(e);
    }
    finally {
        loading.value = false;
    }
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ style: "padding: 12px; border: 1px solid #ddd; border-radius: 12px;" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.run) },
    disabled: (__VLS_ctx.loading),
});
// @ts-ignore
[run, loading,];
(__VLS_ctx.loading ? "Gemini 回覆中..." : "測試 Gemini");
// @ts-ignore
[loading,];
if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ style: "color: #c00; margin-top: 10px;" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
if (__VLS_ctx.text) {
    // @ts-ignore
    [text,];
    __VLS_asFunctionalElement(__VLS_intrinsics.pre, __VLS_intrinsics.pre)({
        ...{ style: "white-space: pre-wrap; margin-top: 10px;" },
    });
    (__VLS_ctx.text);
    // @ts-ignore
    [text,];
}
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
