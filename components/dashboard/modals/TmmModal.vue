<template>
  <BaseModal v-model="internalValue" title="TMM Details">
  <!-- <div class="overflow-y-auto max-h-[450px]"> -->
    <div :class="['overflow-y-auto max-h-[450px]', styles.scrollbar]">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          <tr>
            <th class="text-left py-2 px-3 text-xs">#</th>
            <th class="text-left py-2 px-3 text-xs">Source</th>
            <th class="text-left py-2 px-3 text-xs">Tonnage</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="item.source + index"
            class="border-t border-gray-200 dark:border-gray-700"
          >
            <td class="py-2 px-3">{{ index + 1 }}</td>
            <td class="py-2 px-3">{{ item.source }}</td>
            <td class="py-2 px-3">{{ item.value }}</td>
          </tr>
        </tbody>
        <tfoot v-if="paginatedData.length < props.data.length">
          <tr>
            <td colspan="3" class="text-center py-3">
              <button @click="loadMore" class="text-sm text-primary-600 hover:underline">Load More</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </BaseModal>
</template>


<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import styles from '@/assets/css/scrollbar.module.css'

const props = defineProps<{
  modelValue: boolean
  data: { source: string; value: number }[]
}>()

const emit = defineEmits(['update:modelValue'])

// Reactive modal state (v-model)
const internalValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  internalValue.value = val
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})

// ⏬ Pagination
const itemsPerPage = 10
const currentPage = ref(1)

const paginatedData = computed(() =>
  props.data.slice(0, currentPage.value * itemsPerPage)
)

function loadMore() {
  currentPage.value++
}
</script>
<!-- <style scoped>
/* Scrollbar umum */
::-webkit-scrollbar {
  width: 6px;
}

/* Default (light mode) */
::-webkit-scrollbar-thumb {
  background-color: rgba(127, 126, 126, 0.1);
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

/* Dark mode pakai class .dark di html tag */
:deep(.dark) ::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
}
</style> -->