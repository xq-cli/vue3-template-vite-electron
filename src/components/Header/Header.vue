<template>
  <div class="header">
    <div class="logo">
      <img
        src="@/assets/home-logo.png"
        style="cursor: pointer"
        @click="herfIndex"
        alt=""
      />
    </div>
    <div class="navigation">
      <slot name="navigation"></slot>
    </div>
    <div class="btn">
      <div class="systemButton">
        <i
          class="iconfont icon-zuixiaohua"
          @click="changeWindowSize('min')"
        ></i>
        <span @click="setMaxOrMin"
          ><i class="iconfont icon-zuidahua font-16" v-if="isMax"></i>
          <i class="iconfont icon-chuangkouzuidahua font-16" v-else></i
        ></span>
        <i class="iconfont icon-guanbi" @click="changeWindowSize('close')"></i>
      </div>
      <div class="func">
        <slot name="function"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useWindowEvent from "@/components/hooks/useWindowEvent";

const router = useRouter();
const { changeWindowSize } = useWindowEvent();

const isMax = ref(true);
const setMaxOrMin = () => {
  if (isMax.value) {
    changeWindowSize("unmaximize");
  } else {
    changeWindowSize("maxmizeWindow");
  }
  isMax.value = !isMax.value;
};

const herfIndex = () => {
  changeWindowSize("unmaximize");
  router.push("/login");
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  background: #144177;
  padding: 0 15px;
  box-sizing: border-box;
  -webkit-app-region: drag;
  .font-16 {
    font-size: 14px;
  }
  .logo {
    img {
      width: auto;
      height: 40px;
      -webkit-app-region: no-drag;
    }
  }
  .navigation {
    -webkit-app-region: no-drag;
  }
  .func {
    -webkit-app-region: no-drag;
  }
  .btn {
    height: 100%;
    display: flex;
    flex-direction: column;
    > div.systemButton {
      padding-top: 10px;
      height: 60%;
      width: 70px;
      display: flex;
      justify-content: space-between;
      i {
        cursor: pointer;
        -webkit-app-region: no-drag;
      }
    }
    .slot {
      height: 30px;
      align-self: flex-start;
    }
  }
}
</style>
