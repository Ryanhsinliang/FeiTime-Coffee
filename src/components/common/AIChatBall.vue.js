import { ref, nextTick } from 'vue';
import { askCoffeeAssistant } from '@/services/geminiChatBallAgent';
const showChat = ref(false);
const inputText = ref('');
const isLoading = ref(false);
const hasUnread = ref(false);
const chatBody = ref(null);
const chatHeight = ref(384);
const isResizing = ref(false);
const startY = ref(0);
const startHeight = ref(0);
const messages = ref([
    {
        user: 'ai',
        text: '嗨！我是你的咖啡小助手 ☕<br>有什麼咖啡問題想問我嗎？',
    },
]);
const scrollToBottom = () => {
    if (chatBody.value) {
        nextTick(() => {
            chatBody.value.scrollTop = chatBody.value.scrollHeight;
        });
    }
};
const toggleChat = () => {
    showChat.value = !showChat.value;
    if (showChat.value) {
        hasUnread.value = false;
        scrollToBottom();
    }
};
const startResize = (e) => {
    isResizing.value = true;
    startY.value = e.clientY;
    startHeight.value = chatHeight.value;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
    e.preventDefault();
};
const handleResize = (e) => {
    if (!isResizing.value)
        return;
    const deltaY = startY.value - e.clientY;
    const newHeight = startHeight.value + deltaY;
    if (newHeight >= 300 && newHeight <= 700) {
        chatHeight.value = newHeight;
    }
};
const stopResize = () => {
    isResizing.value = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
};
const sendMessage = async () => {
    if (!inputText.value.trim() || isLoading.value)
        return;
    const question = inputText.value.trim();
    messages.value.push({ user: 'me', text: question });
    inputText.value = '';
    await nextTick();
    scrollToBottom();
    isLoading.value = true;
    try {
        const conversationHistory = messages.value.slice(-10).map((msg) => ({
            role: msg.user === 'ai' ? 'assistant' : 'user',
            content: msg.text,
        }));
        const response = await askCoffeeAssistant(question, conversationHistory);
        // 直接存儲 HTML 格式的回應
        messages.value.push({ user: 'ai', text: response.answer });
        if (!showChat.value) {
            hasUnread.value = true;
        }
    }
    catch (error) {
        console.error('AI 回應錯誤:', error);
        messages.value.push({
            user: 'ai',
            text: '抱歉，目前遇到一些技術問題 😅<br>請稍後再試，或直接聯繫我們的客服團隊！',
        });
    }
    finally {
        isLoading.value = false;
        await nextTick();
        scrollToBottom();
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "fixed bottom-5 right-5 z-50 flex flex-col items-end" },
});
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
Transition;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "fade",
}));
const __VLS_2 = __VLS_1({
    name: "fade",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.showChat) {
    // @ts-ignore
    [showChat,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-80 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden mb-3" },
        ...{ style: ({ height: __VLS_ctx.chatHeight + 'px' }) },
    });
    // @ts-ignore
    [chatHeight,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onMousedown: (__VLS_ctx.startResize) },
        ...{ class: "h-1 bg-gray-300 hover:bg-[#A2AF9B] cursor-ns-resize transition-colors" },
    });
    // @ts-ignore
    [startResize,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "bg-[#A2AF9B] text-white px-4 py-2 flex justify-between items-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        viewBox: "0 0 100 100",
        ...{ class: "w-6 h-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
        cx: "50",
        cy: "55",
        rx: "28",
        ry: "35",
        fill: "#6F4E37",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        d: "M 50 25 Q 45 55 50 85",
        stroke: "#8B6F47",
        'stroke-width': "3",
        fill: "none",
        'stroke-linecap': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "50",
        cy: "25",
        r: "15",
        fill: "#A0826D",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.line)({
        x1: "50",
        y1: "10",
        x2: "50",
        y2: "15",
        stroke: "#E8B4B8",
        'stroke-width': "2",
        'stroke-linecap': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "50",
        cy: "8",
        r: "3",
        fill: "#FF6B6B",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "44",
        cy: "24",
        r: "2.5",
        fill: "#FFF",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "56",
        cy: "24",
        r: "2.5",
        fill: "#FFF",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "44.5",
        cy: "24.5",
        r: "1.5",
        fill: "#333",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "56.5",
        cy: "24.5",
        r: "1.5",
        fill: "#333",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        d: "M 43 28 Q 50 31 57 28",
        stroke: "#FFF",
        'stroke-width': "1.5",
        fill: "none",
        'stroke-linecap': "round",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.rect)({
        x: "20",
        y: "50",
        width: "8",
        height: "20",
        rx: "4",
        fill: "#8B6F47",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.rect)({
        x: "72",
        y: "50",
        width: "8",
        height: "20",
        rx: "4",
        fill: "#8B6F47",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "24",
        cy: "72",
        r: "4",
        fill: "#A0826D",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.circle)({
        cx: "76",
        cy: "72",
        r: "4",
        fill: "#A0826D",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        d: "M 40 15 Q 38 10 40 5",
        stroke: "#E8E8E8",
        'stroke-width': "1.5",
        fill: "none",
        'stroke-linecap': "round",
        opacity: "0.6",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        d: "M 60 15 Q 62 10 60 5",
        stroke: "#E8E8E8",
        'stroke-width': "1.5",
        fill: "none",
        'stroke-linecap': "round",
        opacity: "0.6",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.showChat))
                    return;
                __VLS_ctx.showChat = false;
                // @ts-ignore
                [showChat,];
            } },
        ...{ class: "text-white font-bold hover:opacity-80" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50" },
        ref: "chatBody",
    });
    /** @type {typeof __VLS_ctx.chatBody} */ ;
    // @ts-ignore
    [chatBody,];
    for (const [msg, idx] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
        // @ts-ignore
        [messages,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (idx),
            ...{ class: "flex" },
        });
        if (msg.user === 'ai') {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "bg-white p-3 rounded-lg max-w-[75%] shadow-sm" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-sm text-gray-800 ai-message" },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (msg.text) }, null, null);
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "ml-auto bg-[#A2AF9B] text-white p-3 rounded-lg max-w-[75%]" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-sm whitespace-pre-wrap" },
            });
            (msg.text);
        }
    }
    if (__VLS_ctx.isLoading) {
        // @ts-ignore
        [isLoading,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "bg-white p-3 rounded-lg shadow-sm" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex space-x-1" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "w-2 h-2 bg-gray-400 rounded-full animate-bounce" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" },
        });
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "p-3 border-t bg-white flex space-x-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        ...{ onKeyup: (__VLS_ctx.sendMessage) },
        value: (__VLS_ctx.inputText),
        disabled: (__VLS_ctx.isLoading),
        type: "text",
        placeholder: "輸入訊息...",
        ...{ class: "flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#A2AF9B] disabled:bg-gray-100" },
    });
    // @ts-ignore
    [isLoading, sendMessage, inputText,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.sendMessage) },
        disabled: (__VLS_ctx.isLoading || !__VLS_ctx.inputText.trim()),
        ...{ class: "bg-[#A2AF9B] text-white px-4 py-2 rounded-lg hover:bg-[#8f9b88] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" },
    });
    // @ts-ignore
    [isLoading, sendMessage, inputText,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "whitespace-nowrap" },
    });
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "relative w-16 h-16" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "absolute w-24 h-6 bg-black/15 rounded-full bottom-1 left-1/2 -translate-x-1/2 blur-lg" },
});
if (__VLS_ctx.hasUnread && !__VLS_ctx.showChat) {
    // @ts-ignore
    [showChat, hasUnread,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse z-10" },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.toggleChat) },
    ...{ class: "relative w-16 h-16 bg-[#bac7b2] rounded-full overflow-hidden hover:scale-105 transition transform shadow-[0_6px_18px_rgba(0,0,0,0.25)] p-2" },
});
// @ts-ignore
[toggleChat,];
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    viewBox: "0 0 100 100",
    ...{ class: "w-full h-full" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "50",
    cy: "55",
    rx: "28",
    ry: "35",
    fill: "#6F4E37",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 50 25 Q 45 55 50 85",
    stroke: "#8B6F47",
    'stroke-width': "3",
    fill: "none",
    'stroke-linecap': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "50",
    cy: "25",
    r: "15",
    fill: "#A0826D",
});
__VLS_asFunctionalElement(__VLS_intrinsics.line)({
    x1: "50",
    y1: "10",
    x2: "50",
    y2: "15",
    stroke: "#E8B4B8",
    'stroke-width': "2",
    'stroke-linecap': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "50",
    cy: "8",
    r: "3",
    fill: "#FF6B6B",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "44",
    cy: "24",
    r: "2.5",
    fill: "#FFF",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "56",
    cy: "24",
    r: "2.5",
    fill: "#FFF",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "44.5",
    cy: "24.5",
    r: "1.5",
    fill: "#333",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "56.5",
    cy: "24.5",
    r: "1.5",
    fill: "#333",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 43 28 Q 50 31 57 28",
    stroke: "#FFF",
    'stroke-width': "1.5",
    fill: "none",
    'stroke-linecap': "round",
});
__VLS_asFunctionalElement(__VLS_intrinsics.rect)({
    x: "20",
    y: "50",
    width: "8",
    height: "20",
    rx: "4",
    fill: "#8B6F47",
});
__VLS_asFunctionalElement(__VLS_intrinsics.rect)({
    x: "72",
    y: "50",
    width: "8",
    height: "20",
    rx: "4",
    fill: "#8B6F47",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "24",
    cy: "72",
    r: "4",
    fill: "#A0826D",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "76",
    cy: "72",
    r: "4",
    fill: "#A0826D",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 40 15 Q 38 10 40 5",
    stroke: "#E8E8E8",
    'stroke-width': "1.5",
    fill: "none",
    'stroke-linecap': "round",
    opacity: "0.6",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 60 15 Q 62 10 60 5",
    stroke: "#E8E8E8",
    'stroke-width': "1.5",
    fill: "none",
    'stroke-linecap': "round",
    opacity: "0.6",
});
/** @type {__VLS_StyleScopedClasses['fixed']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-5']} */ ;
/** @type {__VLS_StyleScopedClasses['right-5']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-end']} */ ;
/** @type {__VLS_StyleScopedClasses['w-80']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-1']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-ns-resize']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-80']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[75%]']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['ai-message']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-[75%]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-bounce']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-bounce']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-100']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-bounce']} */ ;
/** @type {__VLS_StyleScopedClasses['delay-200']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#A2AF9B]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-[#8f9b88]']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['w-24']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/15']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-1']} */ ;
/** @type {__VLS_StyleScopedClasses['left-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-x-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['blur-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-white']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['z-10']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#bac7b2]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['transition']} */ ;
/** @type {__VLS_StyleScopedClasses['transform']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-[0_6px_18px_rgba(0,0,0,0.25)]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
