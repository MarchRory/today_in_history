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
    console.log(data);
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
      <div class="w-full text-2xl font-bold text-center">
        {{ meta.subtitle }} - {{ meta.update_time.substring(0, 10) }}
      </div>
      <div
        class="w-full px-4 py-4 overflow-auto border-4 rounded-lg border-cyan-400 h-5/6 bg-zinc-100"
      >
        <transition-group name="fade" tag="ul">
          <li
            class="flex flex-col w-full h-56 px-3 py-2 mb-3 rounded-md bg-zinc-200"
            v-for="(item, index) in showlist"
            :key="index"
          >
            <div
              class="flex flex-col"
              :style="{ flexDirection: index % 2 == 0 ? 'row' : 'row-reverse' }"
            >
              <div class="w-full py-3">{{ item.title }}</div>
              <div class="flex-1">{{ item.desc }}</div>
              <a class="py-3" :href="item.url" target="_blank">详情</a>
            </div>
          </li>
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
::-webkit-scrollbar {
  width: 6px;
  height: 0;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(138, 218, 250);
  border-radius: 15px;
}
::-moz-scrollbar {
  width: 6px;
  height: 0;
}
::-moz-scrollbar-thumb {
  background-color: rgb(138, 218, 250);
}
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
