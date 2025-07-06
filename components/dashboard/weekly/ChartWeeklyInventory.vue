<template>
  <BaseLineColumnArea
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Weekly Trend Inventory"
    :colors="['#3b82f6','#e6533c','#f59e0b','#23b7e5']"
  />
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import BaseLineColumnArea from '@/components/charts/BaseLineColumnArea.vue'

type ChartSeries = { name: string; data: number[]; type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartFilter = useChartFilterStore()
const chartData = ref<ChartData | null>(null)

function generateDummyData(): ChartData {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const generateData = (): number[] =>
    Array.from({ length: days.length }, () => Math.floor(Math.random() * 500 + 400))

  return {
    categories: days,
    series: [
      { name: 'Actual', type: 'bar', data: generateData() },
      { name: 'Plan', type: 'line', data: generateData() }
    ]
  }
}

async function fetchWeeklyData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'weekly')

    if (chartFilter.year) {
      params.append('year', chartFilter.year.toString())
    }

    if (chartFilter.month) params.append('month', chartFilter.month.value.toString())

    const weekParam = chartFilter.year && chartFilter.week
      ? `${chartFilter.year}-${String(chartFilter.week).padStart(2, '0')}`: ''

    if (weekParam) {
      params.append('week', weekParam)
    }

    const url = `${BASE_URL}dashboard/api/inventory-chart/?${params.toString()}`

    const response = await fetch(url)
    const data = await response.json()

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Mining', type: 'bar', data: data.y_data_stock },
         { name: 'Selling', type: 'bar', data: data.y_data_out },
         { name: 'Blance', type: 'line', data: data.y_data_balance }
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch data weekly, pakai dummy data:', error)
    chartData.value = generateDummyData()
  }
}

onMounted(fetchWeeklyData)

// Auto-refresh kalau filter week berubah
watch(() => chartFilter.week, fetchWeeklyData)
</script>
