<template>
  <BaseAreaChart
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Yearly Trend"
    :colors="['#3b82f6', '#f59e0b']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'

type ChartSeries = { name: string; data: number[];type?: string  }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartData = ref<ChartData | null>(null)

function generateDummyWeeklyData(): ChartData {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const generateData = (): number[] =>
    Array.from({ length: months.length }, () => Math.floor(Math.random() * 500 + 400))

  return {
    categories: months,
    series: [
      { name: 'Actual', type:'bar',data: generateData() },
      { name: 'Plan', data: generateData() }
    ]
  }
}

onMounted(() => {
  chartData.value = generateDummyWeeklyData()
})
</script>
