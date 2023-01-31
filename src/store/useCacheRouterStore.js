import { defineStore } from "pinia";

export const useCacheRouterStore = defineStore("cacheRouter", {
  state: () => ({
    includeList: [],
    cacheRouterList: [],
    menu: [],
    info: {},
    currentRouterParent: {},
    currentRouterChildren: [],
  }),
  getters: {},
  actions: {},
});
