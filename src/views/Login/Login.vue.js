import { reactive, ref, onMounted } from 'vue';
import { useAuthStore } from '../../store/auth';
import { useRouter } from 'vue-router';
import { useReCaptcha } from 'vue-recaptcha-v3';
const authStore = useAuthStore();
const router = useRouter();
const recaptcha = useReCaptcha();
const executeRecaptcha = recaptcha?.executeRecaptcha;
const recaptchaLoaded = recaptcha?.recaptchaLoaded;
// 表單狀態
const form = reactive({
    email: '',
    password: '',
});
const isLoading = ref(false);
const errorMessage = ref('');
const isPasswordVisible = ref(false);
const rememberMe = ref(false);
onMounted(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        form.email = savedEmail;
        rememberMe.value = true;
    }
});
const submitForm = async () => {
    const cleanEmail = form.email.trim();
    const cleanPassword = form.password.trim();
    if (!cleanEmail) {
        errorMessage.value = '請輸入帳號';
        return;
    }
    else if (!cleanPassword) {
        errorMessage.value = '請輸入密碼';
        return;
    }
    isLoading.value = true;
    errorMessage.value = '';
    try {
        if (!recaptchaLoaded || !executeRecaptcha) {
            throw new Error('驗證插件尚未準備就緒');
        }
        await recaptchaLoaded();
        const captchaToken = await executeRecaptcha('login');
        const result = await authStore.handleLogin(form.email, form.password, rememberMe.value, captchaToken);
        if (result.success) {
            if (rememberMe.value) {
                localStorage.setItem('rememberedEmail', form.email);
            }
            else {
                localStorage.removeItem('rememberedEmail');
            }
            router.push({ name: 'HomePage' });
        }
        else {
            errorMessage.value = authStore.banner?.message || result.message || '登入失敗';
        }
    }
    catch (err) {
        errorMessage.value = '連線伺服器失敗，請稍後再試';
    }
    finally {
        isLoading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
