<template>
  <BaseColumn
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="All Time Inventory"
    :colors="['#845adf', '#e6533c','#23b7e5', '#f5b849']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseColumn from '@/components/charts/BaseColumn.vue'


type ChartSeries = { name: string; data: number[]; type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartFilter = useChartFilterStore()

const chartData = ref<ChartData | null>(null)

function generateDummyData(): ChartData {
  const years = ['2020', '2021', '2022', '2023', '2024']
  const generateData = () => years.map(() => Math.floor(Math.random() * 10000 + 8000))

  return {
    categories: years,
    series: [
      { name: 'Actual', type:'bar',data: generateData() },
      { name: 'Plan', data: generateData() }
    ]
  }
}


async function fetchYearlyData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'all')

    const url = `${BASE_URL}dashboard/api/inventory-chart/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Mining', type: 'bar', data: data.y_data_stock },
        { name: 'Selling', type: 'bar', data: data.y_data_out },
        // { name: 'Blance', type: 'line', data: data.y_data_balance }
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
