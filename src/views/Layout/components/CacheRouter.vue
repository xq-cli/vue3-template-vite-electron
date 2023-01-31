<template>
  <div class="cache-router">
    <div
      @click="jump(item)"
      v-for="item in cacheRouterStore.cacheRouterList"
      :key="item.id"
      class="cache-router-item"
    >
      <span>
        {{ item.title }}
      </span>
      <el-icon style="cursor: pointer" @click.stop="closeCacheRouter(item)"
        ><CircleCloseFilled
      /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { useCacheRouterStore } from "@/store/useCacheRouterStore";
import { useRouter } from "vue-router";
import { CircleCloseFilled } from "@element-plus/icons-vue";
const router = useRouter();

const cacheRouterStore = useCacheRouterStore();

const jump = (item) => {
  router.push(item);
};
const closeCacheRouter = (item) => {
  cacheRouterStore.cacheRouterList.forEach((router, idx) => {
    if (router.name == item.name) {
      cacheRouterStore.cacheRouterList.splice(idx, 1);
    }
  });
  cacheRouterStore.includeList.forEach((val, idx) => {
    if (val == item.name) {
      cacheRouterStore.includeList.splice(idx, 1);
    }
  });
};
</script>

<style scoped lang="scss">
.cache-router {
  width: 100%;
  height: 20px;
  display: flex;
  border-bottom: 1px solid #e5e3e3;
  box-sizing: border-box;
  .cache-router-item {
    box-sizing: border-box;
    margin: 0 2px;
    font-size: 14px;
    border: 1px solid gray;
    line-height: 14px;
    padding: 2px 4px;
    display: flex;
    align-items: center;
    border-radius: 3px;
    span {
      margin-right: 2px;
      cursor: pointer;
    }
  }
}
</style>
