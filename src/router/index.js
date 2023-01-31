import { createRouter, createWebHashHistory } from "vue-router";
import { useCacheRouterStore } from "@/store/useCacheRouterStore.js";
import useAccountInfoStore from "@/store/useAccountInfoStore";
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    beforeEnter: () => {
      const accountInfoStore = useAccountInfoStore();
      accountInfoStore.$reset();
      return true;
    },
  },

  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/views/Layout/Layout.vue"),
    redirect: "/layout/index",
    children: [
      {
        path: "index",
        name: "Index",
        meta: {
          keepAlive: false,
          title: "首页",
        },
        component: () => import("@/views/Index/index.vue"),
      },
    ],
  },
  {
    path: "/pdf",
    name: "Pdf",
    component: () => import("@/views/Pdf/Pdf.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const store = useCacheRouterStore();
  if (to.meta.keepAlive) {
    const route = {
      path: to.path,
      name: to.name,
      title: to.meta.title,
    };
    const re = store.cacheRouterList.find(
      (item) => JSON.stringify(item) == JSON.stringify(route)
    );
    if (!re) {
      store.includeList.push(to.name);
      store.cacheRouterList.push(route);
    }
  }
  next();
});
export default router;
