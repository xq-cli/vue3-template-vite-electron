// 新建打印窗口
import { BrowserWindow, dialog, ipcMain, Notification } from "electron";
import Path from "path";

class Queue {
  constructor() {
    this.collect = [];
    this.timer = null;
  }

  addTask(task) {
    this.collect.push(task);
    this.start();
  }

  start() {
    const step = () => {
      if (this.collect.length) {
        const task = this.collect.shift();
        task();
        this.timer = setTimeout(() => {
          step();
        }, 1000);
      } else {
        clearTimeout(this.timer);
        this.timer = null;
      }
    };
    if (this.timer) return;
    step();
  }
}

class Store {
  constructor() {
    this.data = null;
    this.event = null;
  }

  setEvent(e) {
    this.event = e;
  }

  setData(data) {
    this.data = data;
    this.event.reply("pdf-reply", this.data);
  }
}

const fs = require("fs-extra");
const printWindows = new Map();

const createPrintWindow = (head, html, options) => {
  let newPrintWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  const printPageURL =
    process.env.NODE_ENV === "development"
      ? `http://localhost:5173/#/pdf`
      : Path.join(__dirname, "#/pdf");
  console.log(process.env.NODE_ENV);
  console.log(printPageURL);
  newPrintWindow.loadURL(printPageURL);
  newPrintWindow.once("ready-to-show", () => {
    newPrintWindow.show();
    newPrintWindow.maximize();
  });

  newPrintWindow.on("closed", () => {
    printWindows.delete(newPrintWindow);
    newPrintWindow = null;
  });

  printWindows.set(newPrintWindow, {
    head,
    html,
    options,
  });
};

// 打印队列
const printQueue = new Queue();
// 存储pdf buffer数据
const bufferStore = new Store();
ipcMain.on("export-pdf", (e, head, html, options) => {
  createPrintWindow(head, html, options);
  bufferStore.setEvent(e);
});

ipcMain.on("pdf-page-ready", (e) => {
  const win = BrowserWindow.fromWebContents(e.sender);
  const { head, html } = printWindows.get(win);
  e.reply("pdf-page-ready-reply", head, html);
});

ipcMain.on("pdf-content", (e) => {
  const task = () => {
    const win = BrowserWindow.fromWebContents(e.sender);
    const { options = { pdf: false } } = printWindows.get(win);
    const { pdf = false } = options;
    if (pdf) {
      e.sender
        .printToPDF(options)
        .then((data) => {
          bufferStore.setData(data);
          return dialog.showSaveDialog(win, {
            title: "保存成pdf",
            filters: [{ name: "PDF", extensions: ["pdf"] }],
          });
        })
        .catch((e) => {
          console.log(e);
          win.close();
        })
        .then((result) => {
          if (result.canceled) {
            win.close();
          }
          if (result.filePath) {
            fs.writeFile(result.filePath, bufferStore.data, (error) => {
              if (error) throw error;
              console.log("Write PDF successfully.");
              win.close();
            });
          }
        });
    } else {
      e.sender.print(options, (success) => {
        if (!success) {
          dialog.showMessageBox(win, {
            type: "info",
            title: "提示",
            message: "未完成打印",
          });
        } else {
          const notification = new Notification({
            title: "已发送至打印机，请等待打印",
          });
          notification.show();
        }
        win.close();
      });
    }
  };
  printQueue.addTask(task);
});
