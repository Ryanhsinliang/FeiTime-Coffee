import { computed } from 'vue';
import './button.css';
const props = withDefaults(defineProps(), { primary: false });
const emit = defineEmits();
const classes = computed(() => ({
    'storybook-button': true,
    'storybook-button--primary': props.primary,
    'storybook-button--secondary': !props.primary,
    [`storybook-button--${props.size || 'medium'}`]: true,
}));
const style = computed(() => ({
    backgroundColor: props.backgroundColor,
}));
const onClick = () => {
    emit('click', 1);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = { primary: false };
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.onClick) },
    type: "button",
    ...{ class: (__VLS_ctx.classes) },
    ...{ style: (__VLS_ctx.style) },
});
// @ts-ignore
[onClick, classes, style,];
(__VLS_ctx.label);
// @ts-ignore
[label,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};
