<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
    <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ label }}</p>
    <h3 class="text-2xl font-bold mt-1">{{ value }}</h3>
    <p class="text-sm mt-2">
      <span :class="changeColor">{{ change }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string | number
  change: string
  color: 'emerald' | 'red' | 'yellow' | 'blue' | string
}>()

const changeColor = computed(() => {
  return {
    emerald: 'text-emerald-600',
    red: 'text-red-600',
    yellow: 'text-yellow-500',
    blue: 'text-blue-600'
  }[props.color] || 'text-gray-500'
})
</script>
