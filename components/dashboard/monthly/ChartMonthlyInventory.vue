<template>
  <BaseLineColumnArea
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Monthly Trend Inventory"
       :colors="['#845adf', '#23b7e5', '#f5b849']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseLineColumnArea from '@/components/charts/BaseLineColumnArea.vue'


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

function generateDummyMonthlyData(): ChartData {
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
    params.append('filter_type', 'monthly') // sesuai komponen ini monthly -> 3
    if (chartFilter.year) params.append('year', chartFilter.year.toString())
    if (chartFilter.month) params.append('month', chartFilter.month.value.toString())

    const url = `${BASE_URL}dashboard/api/inventory-chart/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    console.log("Data chart dari backend:", data)

    chartData.value = {
      categories: data.x_data,
      series: [
         { name: 'Mining', type: 'area', data: data.y_data_stock },
         { name: 'Selling', type: 'area', data: data.y_data_out },
         { name: 'Blance', type: 'line', data: data.y_data_balance }
       
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch chart, pakai dummy data:', error)
    chartData.value = generateDummyMonthlyData()
  }
}

// Initial load
onMounted(fetchChartData)

// Re-fetch jika bulan atau tahun berubah
watch(() => [chartFilter.year, chartFilter.month], fetchChartData)

</script>