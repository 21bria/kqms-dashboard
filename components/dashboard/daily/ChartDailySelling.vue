<template>
  <BaseColumnsMarkers v-if="chartData" :series="chartData.series" :categories="chartData.categories"
    title="Daily  Trend Selling" :colors="['#10b981', '#f59e0b']" />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import BaseColumnsMarkers from '@/components/charts/BaseColumnsMarkers.vue'

type ChartSeries = { name: string; data: any[]; type?: string }
type ChartData = { categories?: string[]; series: ChartSeries[]; colors?: string[] }

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
      series: [
        {
          name: 'Actual',
          data: data.x_data.map((label: string, index: number) => ({
            x: label,
            y: data.y_data_actual[index],
            goals: [{
              name: 'Plan',
              value: data.y_data_plan[index],
              strokeColor: '#f5b849',
              strokeHeight: 3,
              // strokeHeight: 10,
              // strokeWidth: 0,
              // strokeLineCap: 'round',
            }]
          }))
        }
      ],
    }
  } catch (error) {
    console.warn('Gagal fetch data range, pakai dummy data:', error)
  }
}
onMounted(() => {
  fetchData()
})

</script>
