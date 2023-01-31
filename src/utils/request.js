import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router";
import { ipcRenderer } from "electron";
import useAccountInfoStore from "@/store/useAccountInfoStore";

const accountInfoStore = useAccountInfoStore();

const prodIp = ipcRenderer.sendSync("getProdIp");
const service = axios.create({
  baseURL: `http://${prodIp}/icu`,
});

service.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = accountInfoStore.token;
    return config;
  },
  (error) => {
    console.log(error);
    // return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.headers["content-type"] === "application/x-msdownload") {
      return response;
    } else if (res.code !== "0") {
      ElMessage({
        message: res.message || " 请求错误 !",
        type: "error",
        duration: 3 * 1000,
      });
      if (res.code === "100012") {
        accountInfoStore.removeToken();
        router.push("/login");
      }
      return Promise.reject(res);
    } else {
      return res.data;
    }
  },
  (error) => {
    if (error) {
      if (error.message === "timeout of 5000ms exceeded") {
        ElMessage({
          message: " 连接超时 !",
          type: "error",
          duration: 3 * 1000,
        });
      } else {
        ElMessage({
          message: " 网络异常 !",
          type: "error",
          duration: 3 * 1000,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default service;
