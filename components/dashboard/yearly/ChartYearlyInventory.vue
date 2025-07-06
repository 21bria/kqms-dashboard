<template>
  <BaseLineColumnArea
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Yearly Trend Inventory"
    :colors="['#845adf', '#23b7e5', '#f5b849']"
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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const generateData = (): number[] =>
    Array.from({ length: months.length }, () => Math.floor(Math.random() * 500 + 400))

  return {
    categories: months,
    series: [
      { name: 'Actual', type: 'bar', data: generateData() },
      { name: 'Plan', type: 'area', data: generateData() }
    ]
  }
}

async function fetchYearlyData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'yearly')
    if (chartFilter.year) params.append('year', chartFilter.year.toString())

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
  console.warn('Gagal fetch data yearly, pakai dummy:', error)
  chartData.value = generateDummyData()
}
}

// Fetch saat component mount
onMounted(fetchYearlyData)

// Optional: Auto-refresh saat filter tahun berubah
watch(() => chartFilter.year, fetchYearlyData)
</script>
