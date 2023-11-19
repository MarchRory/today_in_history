<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ref, computed } from "vue";
import request from "@/utils/request";
import { listItem, ResultModel } from "@/types/index";
interface pagiNation {
  page: number;
  pageSize: number;
}
type metaType = Omit<ResultModel, "data">;
const pagination = ref<pagiNation>({
  page: 0,
  pageSize: 10,
});
const list = ref<listItem[]>([]);
const meta = ref<metaType>({
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
    list.value = data;
    Object.keys(meta.value).forEach((key) => {
      meta.value[key] = res[key];
    });
  });
}
const showlist = computed(() =>
  list.value.slice(
    (pagination.value.page - 1) * pagination.value.pageSize,
    pagination.value.page * pagination.value.pageSize
  )
);

loadList();
</script>

<template>
  <div
    style="height: 100vh"
    class="flex items-center justify-center w-full py-8 font-mono font-bold text-gray-200 bg-slate-100"
  >
    <div
      class="flex flex-col items-center justify-around w-3/5 h-full bg-teal-200"
    >
      <div class="w-full h-1/6">历史上的今天</div>
    </div>
  </div>
</template>

<style scoped></style>
