<template>
  <div class="login-container">
    <div class="container-main">
      <div class="login-left">
        <img src="@/assets/home-logo.png" alt="" />
        <span class="title">Dandelion 智慧手术中心</span>
        <span class="version">临床重症 {{ version }}</span>
      </div>
      <div class="login-right">
        <LoginComponents></LoginComponents>
      </div>
    </div>
    <div class="bottom-logo">
      <img src="@/assets/login-logo.png" alt="" />
      <div>
        <div style="font-size: 12px; color: #fff">
          ©2021 蓝想大数据科技（上海）有限公司
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginComponents from "@/components/LoginComponents/LoginComponents.vue";
import { ipcRenderer } from "electron";
import pkg from "../../package.json";

const version = ref(pkg.version);

onBeforeMount(() => {
  ipcRenderer.invoke("showWindow");
});
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background: url("@/assets/desk.png") no-repeat center center;
  display: flex;
  flex-direction: column;
  .container-main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .login-left {
      padding-right: 3.5%;
      width: 28%;
      height: 54%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: white;
      img {
        width: 100%;
      }
      .title {
        font-size: 24px;
        margin-left: 15.5%;
        margin-top: 10%;
      }
      .version {
        font-size: 18px;
        margin-left: 15.5%;
        margin-top: 2%;
      }
    }
    .login-right {
      width: 28%;
      height: 60%;
    }
  }
  .bottom-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1%;
    img {
      width: 120px;
    }
  }
}
</style>
