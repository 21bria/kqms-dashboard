
<template>
  <BaseLineColumnArea
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Range Trend Inventory"
        :colors="['#845adf', '#23b7e5', '#f5b849']"
  />
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseLineColumnArea from '@/components/charts/BaseLineColumnArea.vue'


type ChartSeries = { name: string; data: number[]; type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartData = ref<ChartData | null>(null)
const chartFilter = useChartFilterStore()

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
      await fetchData()
    }
  }
)

async function fetchData() {
 try {
    const params = new URLSearchParams()
    params.append('filter_type', 'range')

    if (chartFilter.range.start && chartFilter.range.end) {
      params.append('date_start', chartFilter.range.start)
      params.append('date_end', chartFilter.range.end)
    }

    const url = `${BASE_URL}dashboard/api/inventory-chart/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

   
    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Mining', type: 'area', data: data.y_data_stock },
        { name: 'Selling', type: 'area', data: data.y_data_out },
        { name: 'Blance', type: 'line', data: data.y_data_balance }
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch data range, pakai dummy data:', error)
    chartData.value = generateDummyData()
  }
}
onMounted(() => {
  fetchData()
})

</script>
