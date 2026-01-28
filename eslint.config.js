import pluginVue from 'eslint-plugin-vue';
import importPlugin from 'eslint-plugin-import';
import vueParser from 'vue-eslint-parser';
import tsParser from '@typescript-eslint/parser';

export default [
  // Vue 檔案設定
  {
    files: ['src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
      import: importPlugin,
    },
    rules: {
      // 禁止使用 ../ 相對路徑，強制使用 @/ 別名
      'import/no-relative-parent-imports': 'error',
    },
  },
  // TS 檔案設定
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      // 禁止使用 ../ 相對路徑，強制使用 @/ 別名
      'import/no-relative-parent-imports': 'error',
    },
  },
];
