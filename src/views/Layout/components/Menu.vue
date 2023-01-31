<template>
  <div class="menu" :style="{ width: isCollapse ? '64px' : '160px' }">
    <div style="color: red; text-align: center" @click="shrink">收缩</div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#144177"
      text-color="#fff"
      active-text-color="#ffd04b"
      :unique-opened="true"
    >
      <template v-for="(item, index) in menuList" :key="index">
        <template v-if="item.children">
          <el-sub-menu :index="index + 1 + ''">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="(it, id) in item.children" :key="id + 10">
              <el-menu-item-group :index="`${index + 1}-${id + 1}`">
                <el-menu-item
                  @click="jump(it)"
                  :index="`${index + 1}-${id + 1}`"
                  >{{ it.meta.title }}</el-menu-item
                >
              </el-menu-item-group>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="index + 1 + ''" @click="jump(item)">
            <el-icon><setting /></el-icon>
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { Location, Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const emits = defineEmits("changeCollapse");
const active = ref(0);
const menuList = ref([
  {
    title: "首页",
    children: [
      {
        path: "index",
        name: "Index",
        meta: {
          keepAlive: false,
          title: "首页",
        },
      },
      {
        path: "index2",
        name: "Index2",
        meta: {
          keepAlive: false,
          title: "首页2",
        },
      },
    ],
  },
  {
    title: "首页三",
    children: [
      {
        path: "index3",
        name: "Index3",
        meta: {
          keepAlive: false,
          title: "首页3",
        },
      },
    ],
  },
  {
    path: "index4",
    name: "Index4",
    meta: {
      keepAlive: false,
      title: "首页3=4",
    },
  },
]);
const isCollapse = ref(false);
const shrink = () => {
  isCollapse.value = !isCollapse.value;
  emits("changeCollapse", isCollapse.value);
};
const router = useRouter();
const jump = (item) => {
  router.push({ name: item.name });
};
watch(
  () => router.currentRoute.value.name,
  (newValue) => {
    menuList.value.forEach((item, i) => {
      if (newValue == item.name) {
        active.value = i;
      }
    });
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
  width: 160px;
  flex-shrink: 0;
  background: #144177;
  transition: all 0.7s;
  .menu-item {
    width: 100%;
    text-align: center;
    span {
      color: white;
      line-height: 30px;
      cursor: pointer;
    }
  }
  .active {
    background: red;
  }
  :deep(> .el-menu > .el-menu-item) {
    padding: 0;
  }
  :deep(> .el-menu > .el-sub-menu > .el-sub-menu__title) {
    padding: 0;
  }
  :deep(> .el-menu > .el-sub-menu > .el-tooltip__trigger) {
    padding: 0 20px;
  }
  :deep(.el-sub-menu .el-menu-item) {
    min-width: 160px;
  }
  :deep(.el-menu) {
    border-right: none;
  }
}
:deep(.el-menu-item-group__title) {
  display: none !important;
}
</style>
