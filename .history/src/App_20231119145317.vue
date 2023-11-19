<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ref, computed } from "vue";
import request from "@/utils/request";
interface pagiNation {
  page: number;
  pageSize: number;
}
const pagination = ref<pagiNation>({
  page: 0,
  pageSize: 10,
});
const list = ref([]);

function prePage() {
  pagination.value.page--;
}
function nextPage() {
  pagination.value.page++;
}

function loadList() {
  request().then((res) => {
    console.log(res);
  });
}

loadList();
</script>

<template>
  <div></div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped></style>
