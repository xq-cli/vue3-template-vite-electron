import { defineStore } from "pinia";

const useAccountInfoStore = defineStore("accountInfo", {
  state: () => ({
    loginName: "",
    deptTo: "",
    token: "",
    userName: "",
  }),
  actions: {
    removeToken() {
      this.token = "";
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});

export default useAccountInfoStore;
