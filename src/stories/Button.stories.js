import { fn } from 'storybook/test';
import Button from './Button.vue';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Example/Button',
    component: Button,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['small', 'medium', 'large'] },
        backgroundColor: { control: 'color' },
    },
    args: {
        primary: false,
        // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
        onClick: fn(),
    },
};
export default meta;
export const Primary = {
    args: {
        primary: true,
        label: "Button",
    },
};
export const Secondary = {
    args: {
        primary: false,
        label: 'Button',
    },
};
export const Large = {
    args: {
        label: 'Button',
        size: 'large',
    },
};
export const Small = {
    args: {
        label: 'Button',
        size: 'small',
    },
};
