<template>
  <BaseLineColumnArea v-if="chartData" 
    :series="chartData.series"
    :categories="chartData.categories"
    :colors="['#f5b849', '#34d399']"
    />
</template>



<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseLineColumnArea from '@/components/charts/BaseLineColumnArea.vue'


type ChartSeries = { name: string; data: number[]; type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartData = ref<ChartData | null>(null)
const chartFilter = useChartFilterStore()


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

    const url = `${BASE_URL}dashboard/api/ore-chart/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()
    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Limonite', type: 'bar', data: data.y_data_lim },
        { name: 'Saprolite', type: 'bar', data: data.y_data_sap }
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch data range, pakai dummy data:', error)
  }
}
onMounted(() => {
  fetchData()
})

</script>
