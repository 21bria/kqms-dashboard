<template>
  <BaseAreaChart
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="All Time Production"
    :colors="['#3b82f6', '#f59e0b']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'

type ChartSeries = { name: string; data: number[];type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartData = ref<ChartData | null>(null)

function generateDummyYearlyData(): ChartData {
  const years = ['2020', '2021', '2022', '2023', '2024']
  const generateData = () => years.map(() => Math.floor(Math.random() * 10000 + 8000))

  return {
    categories: years,
    series: [
      { name: 'Actual', type:'bar',data: generateData() },
      { name: 'Plan', data: generateData() }
    ]
  }
}

onMounted(() => {
  chartData.value = generateDummyYearlyData()
})
</script>
