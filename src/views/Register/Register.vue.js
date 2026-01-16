import { ref, reactive } from 'vue';
import { registerUser, resendConfirmationEmail } from '@/services/register/register';
import { useUserStore } from '@/store/user';
import { useAuthStore } from '@/store/auth';
const apiError = ref('');
const userStore = useUserStore();
const authStore = useAuthStore();
const isSubmitted = ref(false);
const isLoading = ref(false);
const isResending = ref(false);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const nameRegex = /^[\u4e00-\u9fa5a-zA-Z]{2,20}$/;
const form = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
});
const errors = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
});
function validate() {
    let isValid = true;
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    if (!form.email.trim()) {
        errors.email = '請輸入Email';
        isValid = false;
    }
    else if (!emailRegex.test(form.email.trim())) {
        errors.email = 'Email格式不符';
        isValid = false;
    }
    if (!form.password.trim()) {
        errors.password = '請輸入密碼';
        isValid = false;
    }
    else if (!passwordRegex.test(form.password.trim())) {
        errors.password = '至少 8 碼，需含大小寫字母與數字';
        isValid = false;
    }
    if (form.confirmPassword.trim() !== form.password.trim()) {
        errors.confirmPassword = '確認密碼不符，請再次輸入';
        isValid = false;
    }
    if (!form.name.trim()) {
        errors.name = '請輸入姓名';
        isValid = false;
    }
    else if (!nameRegex.test(form.name.trim())) {
        errors.name = '姓名需為 2–20 字以下中、英文';
        isValid = false;
    }
    return isValid;
}
async function handleSubmit() {
    authStore.clearBanner();
    if (!validate() || isLoading.value)
        return;
    isLoading.value = true;
    try {
        await registerUser({
            username: form.name.trim(),
            email: form.email.trim(),
            password: form.password.trim(),
        });
        userStore.setPendingEmail(form.email);
        isSubmitted.value = true;
        authStore.setBanner('註冊成功！請檢查電子信箱驗證帳號。', 'success');
    }
    catch (err) {
        let message = '註冊失敗，請稍後再試';
        const status = err.status;
        const serverMessage = err.message;
        if (status === 429) {
            message = '操作過於頻繁，請稍等 15 分鐘後再試。';
        }
        else if (status === 400) {
            if (serverMessage.includes('already taken') || serverMessage.includes('已被註冊')) {
                message = '此 Email 帳號已被註冊，請使用其他 Email 或直接登入。';
            }
            else if (serverMessage.includes('Invalid') || serverMessage.includes('格式')) {
                message = '輸入的資料格式有誤。';
            }
            else {
                message = serverMessage || '格式錯誤，請檢查輸入內容。';
            }
        }
        else if (status >= 500) {
            message = '伺服器維護中，請稍後再試。';
        }
        else {
            if (serverMessage.includes('Network Error')) {
                message = '網路連線不穩定，請檢查您的網路。';
            }
            else {
                message = serverMessage || message;
            }
        }
        authStore.setBanner(message, 'error');
    }
    finally {
        isLoading.value = false;
    }
}
async function handleResendEmail() {
    const targetEmail = form.email || userStore.pendingEmail;
    if (!targetEmail || isResending.value)
        return;
    isResending.value = true;
    try {
        await resendConfirmationEmail(targetEmail);
        authStore.setBanner('驗證信已重發，請查看信箱', 'success');
    }
    catch (err) {
        const status = err.status;
        let msg = err.message || '重發失敗，請稍後再試';
        if (status === 429) {
            msg = '發送頻率過高，請稍後再試。';
        }
        else if (status === 404) {
            msg = '找不到該帳號，請重新註冊。';
        }
        authStore.setBanner(msg, 'error');
    }
    finally {
        isResending.value = false;
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
    ...{ class: "relative min-h-screen font-wenkai overflow-hidden" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.video, __VLS_intrinsics.video)({
    src: "./assets/latte_art.mp4",
    autoplay: true,
    loop: true,
    muted: true,
    playsinline: true,
    ...{ class: "absolute inset-0 w-full h-full object-cover -z-10" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "absolute inset-0 bg-black/30 -z-10" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "w-[95%] max-w-[450px] md:w-1/2 my-3 mx-auto backdrop-blur-md bg-background-light/90 py-6 px-8 rounded-xl shadow-md" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-center text-2xl font-semibold mb-5 text-[#F3F3F3]" },
});
(__VLS_ctx.isSubmitted ? '註冊確認' : '會員註冊');
// @ts-ignore
[isSubmitted,];
if (__VLS_ctx.isSubmitted) {
    // @ts-ignore
    [isSubmitted,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center text-[#F3F3F3]" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mb-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-xl font-bold mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({
        ...{ class: "text-[#ABB7A5] block my-2" },
    });
    (__VLS_ctx.form.email);
    // @ts-ignore
    [form,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleResendEmail) },
        disabled: (__VLS_ctx.isResending),
        ...{ class: "text-sm text-[#ABB7A5] hover:text-[#DCCFC0] underline disabled:text-gray-500 mb-8 block mx-auto transition-colors" },
    });
    // @ts-ignore
    [handleResendEmail, isResending,];
    (__VLS_ctx.isResending ? '發送中...' : '沒收到信？點此重發驗證信');
    // @ts-ignore
    [isResending,];
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: "/login",
        ...{ class: "inline-block bg-[#ABB7A5] px-8 py-3 rounded-md text-white font-medium hover:bg-[#DCCFC0] transition shadow-sm" },
    }));
    const __VLS_2 = __VLS_1({
        to: "/login",
        ...{ class: "inline-block bg-[#ABB7A5] px-8 py-3 rounded-md text-white font-medium hover:bg-[#DCCFC0] transition shadow-sm" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    });
    // @ts-ignore
    [handleSubmit,];
    __VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "block text-sm text-[#F3F3F3] mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        type: "email",
        placeholder: "請輸入帳號（Email）",
        required: true,
        ...{ class: "w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" },
    });
    (__VLS_ctx.form.email);
    // @ts-ignore
    [form,];
    if (__VLS_ctx.errors.email) {
        // @ts-ignore
        [errors,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-amber-500 text-xs" },
        });
        (__VLS_ctx.errors.email);
        // @ts-ignore
        [errors,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "block text-sm text-[#F3F3F3] mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        type: "password",
        placeholder: "請輸入密碼",
        required: true,
        ...{ class: "w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" },
    });
    (__VLS_ctx.form.password);
    // @ts-ignore
    [form,];
    if (__VLS_ctx.errors.password) {
        // @ts-ignore
        [errors,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-amber-500 text-xs" },
        });
        (__VLS_ctx.errors.password);
        // @ts-ignore
        [errors,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "block text-sm text-[#F3F3F3] mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        type: "password",
        placeholder: "請再次輸入密碼",
        required: true,
        ...{ class: "w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" },
    });
    (__VLS_ctx.form.confirmPassword);
    // @ts-ignore
    [form,];
    if (__VLS_ctx.errors.confirmPassword) {
        // @ts-ignore
        [errors,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-amber-500 text-xs" },
        });
        (__VLS_ctx.errors.confirmPassword);
        // @ts-ignore
        [errors,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "block text-sm text-[#F3F3F3] mt-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        value: (__VLS_ctx.form.name),
        type: "text",
        placeholder: "請輸入姓名",
        required: true,
        ...{ class: "w-full p-3 border border-gray-300 rounded-md mt-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500" },
    });
    // @ts-ignore
    [form,];
    if (__VLS_ctx.errors.name) {
        // @ts-ignore
        [errors,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-amber-500 text-xs" },
        });
        (__VLS_ctx.errors.name);
        // @ts-ignore
        [errors,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        type: "submit",
        disabled: (__VLS_ctx.isLoading),
        ...{ class: "w-full py-3 mt-6 bg-[#ABB7A5] text-white rounded-md text-base font-medium hover:bg-[#DCCFC0] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center" },
    });
    // @ts-ignore
    [isLoading,];
    if (__VLS_ctx.isLoading) {
        // @ts-ignore
        [isLoading,];
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "animate-spin -ml-1 mr-3 h-5 w-5 text-white" },
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
            ...{ class: "opacity-25" },
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            'stroke-width': "4",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.path, __VLS_intrinsics.path)({
            ...{ class: "opacity-75" },
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
        });
    }
    (__VLS_ctx.isLoading ? '處理中...' : '註冊');
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-center mt-4 text-sm text-[#F3F3F3]" },
    });
    const __VLS_6 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    RouterLink;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
        to: "/login",
        ...{ class: "text-[#ABB7A5] hover:underline" },
    }));
    const __VLS_8 = __VLS_7({
        to: "/login",
        ...{ class: "text-[#ABB7A5] hover:underline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_11 } = __VLS_9.slots;
    var __VLS_9;
    if (__VLS_ctx.apiError) {
        // @ts-ignore
        [apiError,];
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-red-500 text-sm mt-2 text-center" },
        });
        (__VLS_ctx.apiError);
        // @ts-ignore
        [apiError,];
    }
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['font-wenkai']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['-z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/30']} */ ;
/** @type {__VLS_StyleScopedClasses['-z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-[95%]']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[450px]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['my-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-background-light/90']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#F3F3F3]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#F3F3F3]']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#ABB7A5]']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['my-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#ABB7A5]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-[#DCCFC0]']} */ ;
/** @type {__VLS_StyleScopedClasses['underline']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-block']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#ABB7A5]']} */ ;
/** @type {__VLS_StyleScopedClasses['px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#DCCFC0]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#F3F3F3]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#F3F3F3]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#F3F3F3]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#F3F3F3]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#ABB7A5]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#DCCFC0]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['-ml-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-25']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-75']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#F3F3F3]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#ABB7A5]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
