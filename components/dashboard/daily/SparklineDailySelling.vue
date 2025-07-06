<template>
  <div>
    <!-- Loading placeholder -->
    <div v-if="!chartData" class="text-sm text-gray-400 dark:text-gray-500">
      Loading revenue chart...
    </div>
    <!-- Chart muncul hanya jika data sudah siap -->
    <SparklineRevenueChart v-else :series="chartData.series" :categories="chartData.categories"
      :colors="['#f5b849', '#34d399']" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SparklineRevenueChart from '@/components/charts/SparklineRevenueChart.vue'

type ChartSeries = { name: string; data: number[]; type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartData = ref<ChartData | null>(null)
const chartFilter = useChartFilterStore()


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
    if (chartFilter.date) params.append('daily', chartFilter.date)

    const url = `${BASE_URL}dashboard/api/selling-chart/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

     chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', type: 'area', data: data.y_data_actual }
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
