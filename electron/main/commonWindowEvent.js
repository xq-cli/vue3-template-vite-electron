import { BrowserWindow, ipcMain, app, shell } from "electron";
import chokidar from "chokidar";
import { filePath, getProdIp } from "./ip";
// 主进程公共消息处理逻辑
export class CommonWindowEvent {
  static getWin(event) {
    return BrowserWindow.fromWebContents(event.sender);
  }
  static listen() {
    // ipcMain.handle("open-win", (event, arg) => {
    //   const childWindow = new BrowserWindow({
    //     webPreferences: {
    //       preload,
    //       nodeIntegration: true,
    //       contextIsolation: false,
    //     },
    //   });
    //
    //   if (app.isPackaged) {
    //     childWindow.loadFile(indexHtml, { hash: arg });
    //   } else {
    //     childWindow.loadURL(`${url}#${arg}`);
    //   }
    // });
    ipcMain.handle("minimizeWindow", (e) => {
      this.getWin(e)?.minimize();
    });

    ipcMain.handle("maxmizeWindow", (e) => {
      this.getWin(e)?.maximize();
    });

    ipcMain.handle("unmaximizeWindow", (e) => {
      this.getWin(e)?.unmaximize();
    });

    ipcMain.handle("showWindow", (e) => {
      this.getWin(e)?.show();
    });

    ipcMain.handle("closeWindow", (e) => {
      this.getWin(e)?.close();
    });

    ipcMain.on("getProdIp", async (e) => {
      e.returnValue = await getProdIp();
    });
  }
  //主进程公共事件处理逻辑
  static regWinEvent(win) {
    // 开发模式打开开发者工具
    if (!app.isPackaged) {
      win.openDevTools();
    }
    // 放大
    win.on("maximize", () => {
      win.webContents.send("windowMaximized");
    });
    // 缩小
    win.on("unmaximize", () => {
      win.webContents.send("windowUnmaximized");
    });
    // 窗口渲染进程监听快捷键(ps:也可以注册一个系统全局,大可不必)
    win.webContents.on("before-input-event", (event, input) => {
      if (input.code === "F1") {
        shell.showItemInFolder(filePath);
      }
    });
    // 监听配置文件的修改,刷新页面
    const watcher = chokidar.watch(filePath);
    watcher.on("change", () => {
      win.reload();
    });
    // 窗口渲染进程设置打开处理程序
    win.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith("https:")) shell.openExternal(url);
      return { action: "deny" };
    });
  }
}
