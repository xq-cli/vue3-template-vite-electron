import { getDepartmentList } from "@/api/login";

const useDeptList = (props) => {
  const deptoList = ref([]);
  const getDepartment = () => {
    getDepartmentList().then((res) => {
      deptoList.value = res;
    });
  };

  onMounted(() => {
    if (!props.isShowQrCode) {
      getDepartment();
    }
  });

  return {
    deptoList,
    getDepartment,
  };
};
export default useDeptList;
