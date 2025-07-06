<template>
  <div class="space-y-6">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">OB Movement</h3>
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
          :title="chartTitle" :colors="['#3b82f6', '#f59e0b']" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import { BASE_URL } from '@/utils/api'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'

// Tipe props didefinisikan eksplisit
const props = defineProps<{
  filterType: string
  filterYear?: string
  filterMonth?: string
  filterWeek?: string
  dateStart?: string
  dateEnd?: string
}>()

interface ChartSeries {
  name: string
  data: number[]
  type?: string
}

interface ChartData {
  categories: string[]
  series: ChartSeries[]
}

const chartData = ref<ChartData | null>(null)
const chartTitle = ref('Daily trend OB')
const chartFilter = useChartFilterStore()

function generateDummyDailyData(): ChartData {
  const jamLabels = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05', '06']

  const generateTrendSeries = (): number[] => {
    const data: number[] = []
    let current = 700
    for (let i = 0; i < jamLabels.length; i++) {
      const direction = Math.random() > 0.5 ? 1 : -1
      const movement = direction * (Math.random() * 250 + 100)
      current += movement
      current = Math.max(300, Math.min(1100, current))
      const noise = (Math.random() - 0.5) * 60
      data.push(Math.round(current + noise))
    }
    return data
  }

  return {
    categories: jamLabels,
    series: [
      { name: 'Actual', type: 'bar', data: generateTrendSeries() },
      { name: 'Plan', type: 'line', data: generateTrendSeries() }
    ]
  }
}
// Watch perubahan tanggal
watch(() => chartFilter.date, async (newDate) => {
  if (newDate) {
    await fetchData()
  }
})
async function fetchData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'daily')
    if (chartFilter.date) params.append('filter_date', chartFilter.date)

   const url = `${BASE_URL}dashboard/api/chart/detail-ob/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', type: 'bar', data: data.total_actual },
        { name: 'Plan', type: 'area', data: data.total_plan }
      ]
    }
  } catch (error) {
    chartData.value = generateDummyDailyData()
  }
}
onMounted(() => {
  fetchData()
})
</script>