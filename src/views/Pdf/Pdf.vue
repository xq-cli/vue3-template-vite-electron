<template>
  <div id="pdf"></div>
</template>

<script setup>
import { onMounted } from "vue";
import { ipcRenderer } from "electron";
let timer = "";
onMounted(() => {
  ipcRenderer.on("pdf-page-ready-reply", (e, head, html) => {
    console.log(1);
    document.head.innerHTML = head;
    document.querySelector("#pdf").innerHTML = html;

    timer = setTimeout(() => {
      ipcRenderer.send("pdf-content");
      clearTimeout(timer);
    });
  });
  ipcRenderer.send("pdf-page-ready");
});
</script>
<style scoped lang="scss">
// @page {
//   size: landscape;
// }
#pdf {
  transform: scale(0.75);
}
@page {
  margin: 0;
}
</style>
