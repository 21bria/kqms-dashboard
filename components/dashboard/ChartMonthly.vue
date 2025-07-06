<template>
  <BaseAreaChart
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Monthly Trend"
    :colors="['#3b82f6', '#f59e0b']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'

interface MonthOption {
  name: string
  value: number
}

interface ChartSeries {
  name: string
  data: number[]
}

interface ChartData {
  categories: string[]
  series: ChartSeries[]
}

const props = defineProps<{
  year: number
  month: MonthOption
}>()

const chartData = ref<ChartData | null>(null)

function generateDummyMonthlyData(): ChartData {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
  const seriesA = days.map(() => Math.floor(Math.random() * 800 + 200)) // actual
  const seriesB = days.map(() => Math.floor(Math.random() * 800 + 200)) // plan

  return {
    categories: days,
    series: [
      { name: 'Actual', data: seriesA },
      { name: 'Plan', data: seriesB }
    ]
  }
}

onMounted(async () => {
  try {
    const res = await fetch(`/api/monthly-data?year=${props.year}&month=${props.month.value}`)
    const data = await res.json()

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', data: data.y_actual },
        { name: 'Plan', data: data.y_plan }
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch data bulanan, pakai dummy data:', error)
    chartData.value = generateDummyMonthlyData()
  }
})
</script>
