<template>
  <div class="patient-info">
    <Header> </Header>
    <div class="main">
      <Menu @changeCollapse="changeCollapse"></Menu>
      <div
        class="content"
        :style="{ width: status ? 'calc(100% - 64px)' : 'calc(100% - 160px)' }"
      >
        <!-- <Patient></Patient> -->
        <!-- <CacheRouter></CacheRouter> -->
        <div class="view">
          <router-view v-slot="{ Component }">
            <transition name="fade-right" mode="out-in">
              <keep-alive :include="cacheRouterStore.includeList">
                <component :is="Component" :key="$route.name" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header/Header.vue";
import Menu from "./components/Menu.vue";
import CacheRouter from "./components/CacheRouter.vue";
import Patient from "./components/Patient.vue";
import { useCacheRouterStore } from "@/store/useCacheRouterStore.js";
const cacheRouterStore = useCacheRouterStore();

const status = ref(false);
const changeCollapse = (value) => {
  status.value = value;
};
</script>
<style scoped lang="scss">
.patient-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-navs {
    font-size: 12px;
    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    li {
      width: 89px;
      height: 59px;
      text-align: center;
      margin-right: 6px;
      position: relative;
      cursor: pointer;
      &.active {
        &::after {
          content: "";
          position: absolute;
          left: 41px;
          border-top: 8px solid transparent;
          border-bottom: 8px solid #fff;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
        }
      }
      .img {
        padding-top: 14px;
      }
      i {
        font-size: 24px;
      }
      .i-title {
        margin-top: 2px;
      }
    }
  }
  .main {
    display: flex;
    height: calc(100% - 60px);
    width: 100%;
    .content {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      transition: width 0.7s;
      .view {
        background-color: #fff;
        height: calc(100%);
        border: 16px solid #f3f4f9;
        padding: 16px 25px;
      }

      > div:nth-child(2) {
        background-color: #fff;
      }
    }
  }
}
</style>
