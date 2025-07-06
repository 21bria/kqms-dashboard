<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ title }}</p>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ value }}</h3>
        <p class="text-sm mt-2">
          <span :class="percent >= 0 ? 'text-emerald-600' : 'text-red-600'" class="font-semibold">
            {{ percent }}%
          </span>
          <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
        </p>
      </div>
      <div class="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  percent: Number,
  trend: String
})
</script>
