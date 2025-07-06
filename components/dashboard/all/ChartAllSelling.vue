<template>
  <BaseColumn
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="All Time Selling"
    :colors="['#f5b849', '#34d399']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseColumn from '@/components/charts/BaseColumn.vue'


type ChartSeries = { name: string; data: number[]; type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartFilter = useChartFilterStore()
const chartData = ref<ChartData | null>(null)

async function fetchAllData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'all')
    const url = `${BASE_URL}dashboard/api/selling-chart/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()
    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', type: 'bar', data: data.y_data_actual },
        { name: 'Plan', type: 'bar', data: data.y_data_plan }
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch data yearly, pakai dummy:', error)
  }
}
// Fetch saat component mount
onMounted(fetchAllData)

// Optional: Auto-refresh saat filter tahun berubah
watch(() => chartFilter.year, fetchAllData)

</script>
