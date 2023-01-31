import { ipcRenderer } from "electron";

const useWindowEvent = () => {
  const changeWindowSize = (val) => {
    switch (val) {
      case "min":
        ipcRenderer.invoke("minimizeWindow");
        break;
      case "unmaximize":
        ipcRenderer.invoke("unmaximizeWindow");
        break;
      case "maxmizeWindow":
        ipcRenderer.invoke("maxmizeWindow");
        break;
      case "close":
        ipcRenderer.invoke("closeWindow");
        break;
    }
  };
  return {
    changeWindowSize,
  };
};
export default useWindowEvent;
