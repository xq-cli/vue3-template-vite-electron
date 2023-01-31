<template>
  <div class="patient">
    <el-row style="height: 100%">
      <el-col :span="3"
        ><div class="bed">
          <span>{{ patientInfoStore.$state.bedId }}</span>
          <div>
            <el-icon><Avatar /></el-icon>
            {{ patientInfoStore.$state.patientName }}
          </div>
          <el-divider
            direction="vertical"
            style="border-color: #dfe2e5; height: 80%"
          /></div
      ></el-col>
      <el-col :span="18" style="height: 100%">
        <el-row style="height: 100%">
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">病人ID：</div>
              <div class="text">{{ patientInfoStore.$state.inpNo }}</div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">入科：</div>
              <div class="text">{{ patientInfoStore.$state.entryTime }}</div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">医生：</div>
              <div class="text">{{ patientInfoStore.$state.docName }}</div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">护士：</div>
              <div class="text">{{ patientInfoStore.$state.nurName }}</div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">手术时间：</div>
              <div class="text">
                {{ patientInfoStore.$state.operationTime }}
              </div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">术后天数：</div>
              <div class="text">{{ patientInfoStore.$state.sytime }}</div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">阳性：</div>
              <div class="text">{{ patientInfoStore.$state.positive }}</div>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="ptItem">
              <div class="title">过敏史：</div>
              <div class="text">{{ patientInfoStore.$state.allergies }}</div>
            </div></el-col
          >
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import usePatientInfoStore from "@/store/usePatientInfoStore.js";
import { Avatar } from "@element-plus/icons-vue";
const patientInfoStore = usePatientInfoStore();
</script>
<style scoped lang="scss">
.patient {
  width: 100%;
  height: 60px;
  background: #fff;
  .bed {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
      font-size: 18px;
    }
    div {
      font-size: 18px;
      display: flex;
      align-items: center;
    }
  }
  .ptItem {
    height: 100%;
    display: flex;
    align-items: center;
    .title {
      font-size: 14px;
      color: #7f8fa4;
    }
    .text {
      font-size: 14px;
      font-weight: 600;
      color: #354052;
    }
  }
  .special {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
