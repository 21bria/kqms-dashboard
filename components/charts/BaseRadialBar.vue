<template>
  <ClientOnly>
    <div class="space-y-3">
      <div v-for="(item, i) in data" :key="i"
        class="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div class="relative w-16 h-16">
          <ApexChart :key="`${item.label}-${item.percent}`" type="radialBar" :series="[item.percent]"
            :options="getChartOptions(item.color)" width="64" height="64" />

        </div>
        <div class="ml-3">
          <p class="text-sm text-gray-500 dark:text-white/50">{{ item.label }}</p>
          <h5 class="font-semibold text-base">{{ item.value }}</h5>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const getTextColor = (color: string) => {
  if (color.includes('fbbf24') || color.includes('yellow')) return 'text-yellow-500 dark:text-yellow-400'
  if (color.includes('23b7e5')) return 'text-sky-500 dark:text-sky-400'
  return 'text-gray-700 dark:text-gray-200'
}

const getChartOptions = (color: string) => ({
  chart: {
    height: 120,
    width: 100,
    type: "radialBar",
    sparkline: { enabled: true },
    animations: { enabled: false },
    background: "transparent"
  },
  series: [],
  colors: [color],
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: "70%",
        background: "#fff"
      },
      track: {
        background: "#f3f4f6",
        strokeWidth: "100%",
        margin: 0
      },
      dataLabels: {
        name: { show: false },
        value: {
          offsetY: 5,
          color,
          fontSize: "12px",
          show: true,
          fontWeight: 800
        }
      }
    }
  },
  stroke: {
    lineCap: "round"
  },
  labels: [""]
})
</script>
