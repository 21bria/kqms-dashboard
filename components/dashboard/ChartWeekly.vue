<template>
  <BaseAreaChart
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Weekly Production Trend"
    :colors="['#10b981', '#f59e0b']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'

type ChartSeries = { name: string; data: number[];type?: string  }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartData = ref<ChartData | null>(null)

function generateDummyWeeklyData(): ChartData {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const generateData = (): number[] =>
    Array.from({ length: days.length }, () => Math.floor(Math.random() * 500 + 400))

  return {
    categories: days,
    series: [
      { name: 'Actual', type:'bar',data: generateData() },
      { name: 'Plan', type:'line',data: generateData() }
    ]
  }
}

onMounted(() => {
  chartData.value = generateDummyWeeklyData()
})
</script>
