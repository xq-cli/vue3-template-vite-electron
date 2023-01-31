import { queryQrCode } from "@/api/login";
import { useDebounce } from "@vueuse/core";

const useQrCode = (props) => {
  const loginQrcode = ref("");
  const getQrcode = () => {
    return queryQrCode().then((res) => {
      if (res.code === "success") {
        this.qrCode = res.qrCode;
        this.loginQrcode = `data:img/jpg;base64,${res.qrCodeImg}`;
        //todo 循环调用
        // this.polling.start(60 * 1000);
      } else {
        return Promise.reject(new Error("获取二维码失败"));
      }
    });
  };
  const handleChangeCode = useDebounce(() => {
    getQrcode();
  }, 1000);

  onMounted(() => {
    if (props.isShowQrCode) {
      getQrcode();
    }
  });
  onUnmounted(() => {});

  return {
    loginQrcode,
    getQrcode,
    handleChangeCode,
  };
};

export default useQrCode;
