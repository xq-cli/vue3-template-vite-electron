<template>
  <div class="login-commpents">
    <template v-if="isShowQrCode">
      <div @click="changeWindowSize('close')" class="close-icon">
        <img src="@/assets/close.png" alt="" />
      </div>
      <div class="title no-drag">
        <span :class="{ active: !qrCodeActive }" @click="changeType"
          >密码登录</span
        >
        <span :class="{ active: qrCodeActive }" @click="changeType"
          >扫码登录</span
        >
      </div>
    </template>
    <div class="container">
      <div v-if="qrCodeActive" class="qrcode">
        <img :src="loginQrcode" alt="" @click="handleChangeCode" />
        <div>请使用相关设备扫码登录</div>
      </div>
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="100px"
        v-else
      >
        <el-form-item label="账号:" prop="loginName">
          <el-input v-model="form.loginName" class="no-drag" />
        </el-form-item>
        <el-form-item label="密码:" prop="loginPwd">
          <el-input type="password" v-model="form.loginPwd" class="no-drag" s />
        </el-form-item>
        <el-form-item label="科室:" prop="deptTo">
          <el-select
            v-model="form.deptTo"
            placeholder="请选择科室"
            class="no-drag"
          >
            <el-option
              v-for="item in deptoList"
              :key="item.deptCode"
              :label="item.deptName"
              :value="item.deptCode"
              class="no-drag"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="" size="large">
          <el-button @click="submit" class="no-drag login" type="primary"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import useFormSubmit from "./hooks/useFormSubmit";
import useQrCode from "./hooks/useQrCode";
import useDeptList from "./hooks/useDeptList";
import useWindowEvent from "@/components/hooks/useWindowEvent";

const props = defineProps({
  isShowQrCode: {
    type: Boolean,
    default: true,
  },
});
const { changeWindowSize } = useWindowEvent();
const { formRef, rules, form, submit } = useFormSubmit(changeWindowSize);
const { loginQrcode, getQrcode, handleChangeCode } = useQrCode(props);
const { deptoList, getDepartment } = useDeptList(props);
const qrCodeActive = ref(props.isShowQrCode);
const changeType = () => {
  if (qrCodeActive.value) {
    if (deptoList.value.length === 0) {
      getDepartment();
    }
  } else {
    getQrcode();
  }
  qrCodeActive.value = !qrCodeActive.value;
};
</script>
<style scoped lang="scss">
.login-commpents {
  padding-top: 2%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .close-icon {
    align-self: flex-end;
    margin-right: -6%;
    cursor: pointer;
  }
  .title {
    padding-top: 10%;
    width: 100%;
    padding-left: 20%;
    text-align: center;
    .active {
      color: #348bff;
    }
    span {
      cursor: pointer;
      color: #ccc;
      font-size: 18px;
      &:nth-child(1) {
        margin-right: 8px;
      }
    }
  }
  .container {
    width: 80%;
    padding-top: 8%;
    .qrcode {
      padding-left: 26%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ccc;
    }
    :deep(.el-form-item) {
      margin-bottom: 50px;
      .el-select {
        width: 100%;
      }
      .el-form-item__label {
        color: #7e8fa5;
      }
    }
    .login {
      margin-left: 20%;
      width: 100px;
    }
  }
}
</style>
