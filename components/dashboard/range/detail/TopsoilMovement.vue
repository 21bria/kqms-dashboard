<template>
  <div class="space-y-6">
    <!-- Mining Productions Chart -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Topsoil Movement</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">Today's average</p>
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
        <BaseAreaChart v-if="chartData" :series="chartData.series" :categories="chartData.categories"
          :title="chartTitle" :colors="['#0ea5e9', '#f59e0b']" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import { BASE_URL } from '@/utils/api'
import BaseLineChart from '@/components/charts/BaseLineChart.vue'
import BaseMixChart from '@/components/charts/BaseMixChart.vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'
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
const chartTitle = ref('Range Date Trend Topsoil')

function generateDummyData(): ChartData {
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
    Array.from({ length: categories.length }, () => Math.floor(Math.random() * 500 + 100))

  return {
    categories,
    series: [
      { name: 'Actual', type: 'bar', data: generateData() },
      { name: 'Plan', type: 'line', data: generateData() }
    ]
  }
}
watch(
  () => [chartFilter.range.start, chartFilter.range.end],
  async ([start, end]) => {
    if (start && end) {
      await fetchChartData()
    }
  }
)
async function fetchChartData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'range')

    if (chartFilter.range.start && chartFilter.range.end) {
      params.append('date_start', chartFilter.range.start)
      params.append('date_end', chartFilter.range.end)
    }


    const url = `${BASE_URL}dashboard/api/chart/detail-topsoil/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    console.log("Data chart dari backend:", data)

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', type: 'bar', data: data.total_actual },
        { name: 'Plan', type: 'line', data: data.total_plan }
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
