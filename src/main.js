import { createApp } from "vue";
import pinia from "@/store/pinia";
import router from "@/router";
import ElementPlus from "element-plus";
import VXETable from "vxe-table";
import VXETablePluginElement from "vxe-table-plugin-element";

import locale from "element-plus/lib/locale/lang/zh-cn";
import "@/styles/reset.css";
import "element-plus/dist/index.css";
import "vxe-table/lib/style.css";
import "vxe-table-plugin-element/dist/style.css";
import "@/styles/style.scss";
import "@/styles/transition.scss";
import "@/assets/icon/iconfont.css";
// import "@/styles/recordTable.scss";
import App from "@/App.vue";
import "default-passive-events";
VXETable.use(VXETablePluginElement);
const app = createApp(App);
app
  .use(pinia)
  .use(router)
  .use(ElementPlus, { locale })
  .use(VXETable)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
