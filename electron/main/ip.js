import { app } from "electron";
import path from "path";
import fs from "fs-extra";

const appPath = app.getPath("userData");
const filePath = path.join(appPath, "_config.json");

function getProdIp() {
  return fs
    .readJson(filePath)
    .then((obj) => {
      if (obj.baseUrl) {
        return obj.baseUrl;
      } else {
        return Promise.reject(new Error("未找到目录"));
      }
    })
    .catch(() =>
      fs.outputJson(filePath, {
        baseUrl: "http://192.168.1.156:9080",
      })
    )
    .then(() => fs.readJson(filePath))
    .then((obj) => obj.baseUrl);
}

export { getProdIp, filePath };
