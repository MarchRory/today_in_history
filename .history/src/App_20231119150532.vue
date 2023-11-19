<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ref, computed } from "vue";
import request from "@/utils/request";
import { listItem, ResultModel } from "@/types/index";
interface pagiNation {
  page: number;
  pageSize: number;
}
type meta = Omit<ResultModel, "data">;
const pagination = ref<pagiNation>({
  page: 0,
  pageSize: 10,
});
const list = ref<listItem[]>([]);
const meta = ref<meta>({
  subtitle: "",
  success: true,
  title: "",
  update_time: "",
});

function prePage() {
  pagination.value.page--;
}
function nextPage() {
  pagination.value.page++;
}

function loadList() {
  request().then((res: ResultModel) => {
    const { data } = res;
    list.value;
  });
}

loadList();
</script>

<template>
  <div></div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped></style>
