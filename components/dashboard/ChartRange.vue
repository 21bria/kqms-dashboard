<template>
  <BaseAreaChart
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Range Date Production Trend"
    :colors="['#0ea5e9', '#f59e0b']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'

type ChartSeries = { name: string; data: number[];type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartData = ref<ChartData | null>(null)

function generateDummyRangeData(): ChartData {
  const today = new Date()
  const categories: string[] = []

  for (let i = 9; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const day = d.getDate().toString().padStart(2, '0')
    const month = d.toLocaleString('default', { month: 'short' })
    categories.push(`${day} ${month}`)
  }

  const generateData = () =>
    Array.from({ length: categories.length }, () => Math.floor(Math.random() * 400 + 600))

  return {
    categories,
    series: [
      { name: 'Actual',type:'bar', data: generateData() },
      { name: 'Plan', data: generateData() }
    ]
  }
}

// Fallback dummy data
onMounted(() => {
  chartData.value = generateDummyRangeData()
})
</script>
