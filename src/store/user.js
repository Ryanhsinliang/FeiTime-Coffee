import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserStore = defineStore('user', () => {
    const pendingEmail = ref('');
    function setPendingEmail(email) {
        pendingEmail.value = email;
    }
    return { pendingEmail, setPendingEmail };
});
