import { createApp, nextTick } from "vue";
import Main from "./menuMain.vue";
import { nextZIndex } from "vxe-table/lib/tools/utils";

let instance;
let timer;
const ContextMenu = function (options = {}) {
  // 创建node
  let node = document.getElementById("context-menu");
  if (!node) {
    node = document.createElement("div");
    node.id = "context-menu";
    document.body.appendChild(node);
  }

  if (timer) {
    clearTimeout(timer);
  }
  const userOnClose = options.onClose;
  options.onClose = function () {
    ContextMenu.close(userOnClose);
  };
  const userOnSelectMenuItem = options.onSelect;
  options.onSelect = function (item) {
    ContextMenu.onSelectMenuItem(userOnSelectMenuItem, item);
  };
  // 位置调整
  const expectedWidth = 180;
  let expectedHeight = 0;
  if (options.list && Array.isArray(options.list)) {
    expectedHeight = options.list.length * 24 + 4;
    expectedHeight = Math.min(expectedHeight, 135);
  }
  options.posX = Math.min(
    options.posX,
    document.body.clientWidth - expectedWidth
  );
  options.posY = Math.min(
    options.posY,
    document.body.clientHeight - expectedHeight
  );
  // 挂载dom
  instance = null;
  instance = createApp(Main, {
    defData: options,
  }).mount(node);
  // 设置z-index
  instance.$el.style.zIndex = nextZIndex();
  const mousedownHandler = (e) => {
    if (instance && !e.path.includes(instance.$el)) {
      instance.close();
      document.removeEventListener("mousedown", mousedownHandler);
      document.removeEventListener("mousewheel", mousedownHandler);
    }
  };
  document.addEventListener("mousedown", mousedownHandler);
  document.addEventListener("mousewheel", mousedownHandler);

  nextTick(() => {
    instance.visible = true;
  });

  return instance;
};

ContextMenu.close = function (userOnClose) {
  if (typeof userOnClose === "function") {
    userOnClose();
  }
  instance.visible = false;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    nextTick(() => {
      instance = null;
    });
  }, 300);
};

ContextMenu.onSelectMenuItem = function (userOnSelectMenuItem, item) {
  if (typeof userOnSelectMenuItem === "function") {
    userOnSelectMenuItem(item);
  }
  ContextMenu.close();
};

export default ContextMenu;
