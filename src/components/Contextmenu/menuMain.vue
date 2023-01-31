<template>
  <transition name="fade">
    <div
      class="contextMenu"
      ref="contextMenu"
      :style="positionStyle"
      v-show="visible"
    >
      <el-scrollbar :wrap-style="wrapStyle">
        <div class="content">
          <div class="iconContent" />
          <div class="labelContent">
            <div
              class="label"
              v-for="(item, index) in list"
              :key="index"
              @click="selectMenuItem(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </transition>
</template>

<script setup>
import { useVModel } from "@vueuse/core";
import { computed, onBeforeUnmount, ref } from "vue";
import { ElScrollbar } from "element-plus";

const props = defineProps({
  defData: {
    type: Object,
    default: () => {
      return {
        list: [],
        posX: 0,
        posY: 0,
        wrapStyle: [
          {
            "max-height": "100vh",
          },
        ],
        onSelect: () => {},
        onClose: () => {},
      };
    },
  },
});
const contextMenu = ref(null);
const visible = ref(false);
const list = useVModel(props.defData, "list");
const wrapStyle = useVModel(props.defData, "wrapStyle");
const positionStyle = computed(() => {
  return {
    left: props.defData.posX + "px",
    top: props.defData.posY + "px",
  };
});
const selectMenuItem = (item) => {
  props.defData.onSelect(item);
};
const close = () => {
  visible.value = false;
  props.defData.onClose();
};
defineExpose({
  visible: visible,
  close: close,
});
onBeforeUnmount(() => {
  if (contextMenu.value.$el) {
    document.body.removeChild(contextMenu.value.$el);
  }
});
</script>

<style lang="scss" scoped>
.contextMenu {
  position: absolute;
  border: 1px solid #ebeef5;
  background: white;
  border-radius: 4px;
  width: 180px;
  overflow: auto;
  box-shadow: 1px 2px 3px 0px rgba(0, 0, 0, 0.08);
  .content {
    display: flex;
    .iconContent {
      flex: 0 1 0px;
      //@include theme($background-colors, 'background');
      padding: 2px 0;
    }
    .labelContent {
      flex: 1 1 150px;
      //@include theme($background-colors-kit, 'background');
      padding: 2px 0;

      .label {
        cursor: pointer;
        line-height: 28px;
        font-size: 12px;
        height: 28px;
        color: #354052;
        //@include theme($colors, 'color');
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
          background: #f9f9f9;
          //@include theme($background-colors-hover,'background')
        }
        &:active {
          //background: mix($color-primary, $color-white, 20);
          //border: 1px solid $color-primary;
          border-radius: 2px;
        }
      }
    }
  }
}
.fade-enter-active {
  animation: fade 0.2s;
}

.fade-leave-active {
  animation: fade 0.1s reverse;
}
@keyframes fade {
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
