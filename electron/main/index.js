import { app, BrowserWindow } from "electron";
// import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import { join } from "path";
import { CommonWindowEvent } from "./commonWindowEvent";
import "./pdf";
//设置打包环境变量
process.env.DIST_ELECTRON = join(__dirname, "..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, "../public");

//w7禁用硬件加速解决白屏
app.disableHardwareAcceleration();
//win平台设置进程Id,不然会操作系统自动生成
if (process.platform === "win32") app.setAppUserModelId(app.getName());

// 全局变量,防止被gc回收
let win = null;
async function createWindow() {
  const url = process.env.VITE_DEV_SERVER_URL;
  const indexHtml = join(process.env.DIST, "index.html");
  win = new BrowserWindow({
    show: true,
    frame: false,
    width: 1366,
    height: 768,
    // maxWidth: 1366,
    // maxHeight: 768,
    resizable: false,
    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(indexHtml);
  } else {
    win.loadURL(url);
    // await installExtension(VUEJS3_DEVTOOLS);
  }
  CommonWindowEvent.listen();
}
// 当打开一个新的窗口的时候,注册一些公共事件
app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

app.whenReady().then(createWindow);
