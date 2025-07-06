<template>
  <BaseColumnsMarkers v-if="chartData" :series="chartData.series" :categories="chartData.categories"
    title="Range Date Trend Mining" 
     :colors="['#10b981', '#f59e0b']"
    />
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import BaseColumnsMarkers from '@/components/charts/BaseColumnsMarkers.vue'

type ChartSeries = { name: string; data: any[]; type?: string }
type ChartData = { categories?: string[]; series: ChartSeries[]; colors?: string[] }


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

    const url = `${BASE_URL}dashboard/api/summary/mines/ore?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    chartData.value = {
     series: [
        {
          name: 'Actual',
          data: data.x_data.map((label: string, index: number) => ({
            x: label,
            y: data.total_actual[index],
            goals: [{
              name: 'Plan',
              value: data.total_plan[index],
              strokeColor: '#f5b849',
              // strokeHeight: 3,
              strokeHeight: 10,
              strokeWidth: 0,
              strokeLineCap: 'round',
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
