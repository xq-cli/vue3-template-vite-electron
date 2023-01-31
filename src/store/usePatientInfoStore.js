import { defineStore } from "pinia";

const usePatientInfoStore = defineStore("patientInfo", {
  state: () => ({}),
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});

export default usePatientInfoStore;
