import { fn } from 'storybook/test';
import MyHeader from './Header.vue';
const meta = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/configure/#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Example/Header',
    component: MyHeader,
    render: (args) => ({
        components: { MyHeader },
        setup() {
            return { args };
        },
        template: '<my-header :user="args.user" />',
    }),
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        onLogin: fn(),
        onLogout: fn(),
        onCreateAccount: fn(),
    },
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
};
export default meta;
export const LoggedIn = {
    args: {
        user: {
            name: 'Jane Doe',
        },
    },
};
export const LoggedOut = {
    args: {
        user: null,
    },
};
