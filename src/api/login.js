import service from "../utils/request";

// 登录
export function login(data) {
  return service({
    url: "/login",
    method: "post",
    data,
  });
}

// 获取当前用户信息
export function getCurrentUserInfo(data) {
  return service({
    url: "/sysUser/info",
    method: "post",
    data,
  });
}

// 获取登录二维码
export function queryQrCode() {
  return service({
    url: "/webService/getQrCodeBySysAndValidTime",
    method: "get",
  });
}

// 轮询用户登录状态
export function getUserLoginStatus(data) {
  return service({
    url: "/webService/queryQrCodeWithValidTime/" + data,
    method: "get",
  });
}

// 获取科室列表
export function getDepartmentList() {
  return service({
    url: "/patient/selectDeptToAll",
    method: "get",
  });
}
