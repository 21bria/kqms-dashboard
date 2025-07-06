<template>
<div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Others Movement</h3>
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
        <BaseColumnArea v-if="chartData" :series="chartData.series" :categories="chartData.categories"
          :title="chartTitle" :colors="['#3b82f6', '#f59e0b']" />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import { BASE_URL } from '@/utils/api'
import BaseColumnArea from '@/components/charts/BaseColumnArea.vue'

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
const chartTitle = ref('Monthly trend Others')

//  Fungsi dummy untuk simulasi data
function generateDummy(count = 10, base = 500): number[] {
  const data: number[] = []
  for (let i = 0; i < count; i++) {
    base += (Math.random() - 0.5) * 150
    data.push(Math.max(300, Math.round(base)))
  }
  return data
}

//  Generate chart dinamis berdasarkan filterType
function generateChart() {
  const type = props.filterType
  let categories: string[] = []
  let count = 10
  let title = ''

  switch (type) {
    case 'daily':
      categories = [
        '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
        '17', '18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05', '06'
      ]
      count = categories.length
      title = 'Daily Production Overview'
      break

    case 'weekly':
      categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      count = categories.length
      title = 'Weekly Production Overview'
      break

    case 'monthly': {
      const month = parseInt(props.filterMonth || '1')
      const year = parseInt(props.filterYear || `${new Date().getFullYear()}`)
      const daysInMonth = new Date(year, month, 0).getDate()
      categories = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`)
      count = daysInMonth
      title = `Monthly Production (${year}-${month.toString().padStart(2, '0')})`
      break
    }

    case 'yearly':
      categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      count = categories.length
      title = 'Yearly Production Overview'
      break

    case 'range': {
      if (props.dateStart && props.dateEnd) {
        const startDate = new Date(props.dateStart)
        const endDate = new Date(props.dateEnd)
        const dates: string[] = []

        while (startDate <= endDate) {
          const formatted = startDate.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short'
          })
          dates.push(formatted)
          startDate.setDate(startDate.getDate() + 1)
        }

        categories = dates
        count = categories.length
        title = 'Custom Range Production Overview'
      } else {
        categories = ['Invalid Range']
        title = 'Invalid Date Range'
        count = 1
      }
      break
    }

    case 'all':
      categories = ['2021', '2022', '2023', '2024', '2025']
      count = categories.length
      title = 'All Production Data Overview'
      break

    default:
      categories = ['A', 'B', 'C']
      count = categories.length
      title = 'Default Chart'
  }

  chartTitle.value = title
  chartData.value = {
    categories,
    series: [
      {
        name: 'Actual',
        type: 'column',
        data: generateDummy(count)
      },
      {
        name: 'Plan',
        data: generateDummy(count)
      }
    ]
  }
}

// Ambil filter dari store Pinia
const chartFilter = useChartFilterStore()

async function fetchChartData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'monthly') // sesuai komponen ini
    if (chartFilter.year) params.append('filter_year', chartFilter.year.toString())
    if (chartFilter.month) params.append('filter_month', chartFilter.month.value.toString())

    const url = `${BASE_URL}dashboard/api/chart/detail-others/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    console.log("Data chart dari backend:", data)

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', type: 'area', data: data.total_tonnage },
        { name: 'Plan', type: 'area', data: data.total_plan }
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch chart, pakai dummy data:', error)
    generateChart()
  }
}

// Initial load
onMounted(fetchChartData)

// Re-fetch jika bulan atau tahun berubah
watch(() => [chartFilter.year, chartFilter.month], fetchChartData)

</script>
