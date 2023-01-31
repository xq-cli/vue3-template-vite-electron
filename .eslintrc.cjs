/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
    "vue-global-api",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // 关闭名称校验
    "vue/multi-word-component-names": "off",
    "no-debugger": "off",
  },
};
