<script setup lang="ts">
import { ref, computed } from "vue";
import request from "@/utils/request";
import { listItem, ResultModel } from "@/types/index";
interface pagiNation {
  page: number;
  pageSize: number;
}
type metaType = Omit<ResultModel, "data">;
const pagination = ref<pagiNation>({
  page: 1,
  pageSize: 10,
});
const list = ref<listItem[]>([]);
const meta = ref<metaType>({
  subtitle: "",
  success: true,
  title: "",
  update_time: "",
});

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
    class="flex items-center justify-center w-full py-8 font-mono font-bold text-gray-500 bg-zinc-50"
  >
    <div
      class="flex flex-col items-center justify-around w-3/5 h-full overflow-hidden rounded-lg"
    >
      <div class="w-full text-xl text-center">历史上的今天</div>
      <div class="w-full overflow-auto h-5/6 bg-cyan-200">
        <transition-group name="fade" tag="ul">
          <li></li>
        </transition-group>
      </div>
      <div style="margin: 0 auto" class="flex text-xl w-fit">
        <button
          :disabled="pagination.page == 1"
          class="hover:text-indigo-400"
          @click="pagination.page--"
        >
          Pre
        </button>
        <div class="mx-10">
          {{ pagination.page }}/{{
            Math.ceil(list.length / pagination.pageSize)
          }}
        </div>
        <button
          :disabled="
            pagination.page == Math.ceil(list.length / pagination.pageSize)
          "
          @click="pagination.page++"
          class="hover:text-indigo-400"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(60px, 0);
}
.fade-leave-active {
  position: relative;
}
</style>
