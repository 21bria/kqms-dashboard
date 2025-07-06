<template>
  <div class="relative bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow shadow-lg">
    <!-- Isi utama -->
    <div class="flex justify-between items-start">
      <!-- Kiri -->
      <div>
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ title }}</p>
        <h3 class="text-2xl font-bold mt-0 text-gray-900 dark:text-white">{{ formattedValue }}</h3>
        <div class="flex items-center space-x-2 mt-0">
          <span :class="progressAColor">{{ progressA }}%</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ labelA }} |</span>
          <span class="text-sm font-medium text-yellow-600 dark:text-yellow-500">{{ progressB }}%</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ labelB }}</span>
        </div>
      </div>

      <!-- Icon -->
      <div :class="[iconBg, 'p-3 rounded-lg']">
        <slot name="icon" />
      </div>
    </div>

    <!-- View All + Info di bawah -->
    <div class="mt-0 flex justify-between items-center">
      <div>
        <NuxtLink v-if="typeof to === 'string'" :to="to"
          class="text-xs font-medium text-violet-600 hover:underline hover:text-violet-700">
          View All →
        </NuxtLink>
        <button v-else-if="typeof to === 'function'" @click="to"
          class="text-xs font-medium text-violet-600 hover:underline hover:text-violet-700 focus:outline-none">
          View All →
        </button>
      </div>

    </div>
  </div>
</template>



<script setup lang="ts">
import { computed } from 'vue'
import { formatShortNumber } from '@/utils/formatter'

//  Hanya pakai satu kali defineProps dan langsung assign ke variable
const props = defineProps<{
  title: string
  value: number
  progressA: number
  progressB: number
  labelA?: string
  labelB?: string
  iconBg?: string
  to?: string | (() => void) // dinamis: bisa string (NuxtLink) atau fungsi (openModal)
}>()

const formattedValue = computed(() => formatShortNumber(props.value))
const labelA = computed(() => props.labelA?.toLowerCase() || 'target')
const labelB = computed(() => props.labelB?.toLowerCase() || 'target')
</script>
