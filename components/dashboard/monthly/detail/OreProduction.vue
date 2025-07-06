<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ore Productions</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Monthly Trend Ore"</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Actual</span>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Plan</span>
          </div>
        </div>

      </div>
      
      <div class="h-64">
        <BaseColumnArea v-if="chartData" :series="chartData.series" :categories="chartData.categories"
           title="Monthly Trend Ore" :colors="['#3b82f6', '#f59e0b']" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import { BASE_URL } from '@/utils/api'
import BaseColumnArea from '@/components/charts/BaseColumnArea.vue'

interface ChartSeries {
  name: string
  data: number[]
  type: string
}

interface ChartData {
  categories: string[]
  series: ChartSeries[]
}

// Ambil filter dari store Pinia
const chartFilter = useChartFilterStore()

const chartData = ref<ChartData | null>(null)

function generateDummyData(): ChartData {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
  const seriesA = days.map(() => Math.floor(Math.random() * 800 + 200)) // actual
  const seriesB = days.map(() => Math.floor(Math.random() * 800 + 200)) // plan

  return {
    categories: days,
    series: [
      { name: 'Actual', type: 'area', data: seriesA },
      { name: 'Plan', type: 'area', data: seriesB }
    ]
  }
}

async function fetchChartData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'monthly') // sesuai komponen ini
    if (chartFilter.year) params.append('filter_year', chartFilter.year.toString())
    if (chartFilter.month) params.append('filter_month', chartFilter.month.value.toString())

    const url = `${BASE_URL}dashboard/api/chart/detail-ore/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    console.log("Data chart dari backend:", data)

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', type: 'bar', data: data.total_tonnage },
        { name: 'Plan', type: 'area', data: data.total_plan }
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch chart, pakai dummy data:', error)
    chartData.value = generateDummyData()
  }
}

// Initial load
onMounted(fetchChartData)

// Re-fetch jika bulan atau tahun berubah
watch(() => [chartFilter.year, chartFilter.month], fetchChartData)

</script>

