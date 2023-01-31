import { reactive, ref } from "vue";
import { getCurrentUserInfo, login } from "@/api/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { isFunction } from "@vueuse/core";
import useAccountInfoStore from "@/store/useAccountInfoStore";

const useFormSubmit = (changeWindowSize) => {
  const rules = {
    loginName: [
      { required: true, message: "请正确填写用户名", trigger: "blur" },
    ],
    loginPwd: [{ required: true, message: "请正确填写密码", trigger: "blur" }],
    deptTo: [{ required: true, message: "请选择科室", trigger: "blur" }],
  };

  const router = useRouter();

  const accountInfoStore = useAccountInfoStore();

  const formRef = ref(null);
  const form = reactive({
    loginName: "",
    loginPwd: "",
    deptTo: "",
  });
  const submit = () => {
    formRef.value.validate((valid) => {
      if (valid) {
        login(form).then((res) => {
          accountInfoStore.$patch({
            token: res,
          });
          getCurrentUserInfo().then((res) => {
            const { loginName, deptTo, userName } = res;
            accountInfoStore.$patch({
              loginName,
              deptTo,
              userName,
            });
          });
          ElMessage({
            message: "登录成功",
            type: "success",
            duration: 800,
          });
          setTimeout(() => {
            router.push("/layout").then(() => {
              if (isFunction(changeWindowSize)) {
                changeWindowSize("maxmizeWindow");
              }
            });
          }, 1000);
        });
      } else {
        ElMessage.error("请输入必填项!");
      }
    });
  };
  const enterSubmit = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };
  onMounted(() => {
    document.addEventListener("keyup", enterSubmit);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("keyup", enterSubmit);
  });
  return {
    formRef,
    rules,
    form,
    submit,
    enterSubmit,
  };
};

export default useFormSubmit;
