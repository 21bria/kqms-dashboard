<template>
  <BaseColumnsMarkers v-if="chartData" :series="chartData.series" :categories="chartData.categories"
    title="Weekly Trend Selling" :colors="['#10b981', '#f59e0b']" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import BaseColumnsMarkers from '@/components/charts/BaseColumnsMarkers.vue'

type ChartSeries = { name: string; data: any[]; type?: string }
type ChartData = { categories?: string[]; series: ChartSeries[]; colors?: string[] }

const chartFilter = useChartFilterStore()
const chartData = ref<ChartData | null>(null)


async function fetchWeeklyData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'weekly')

    if (chartFilter.year) {
      params.append('year', chartFilter.year.toString())
    }

    if (chartFilter.month) params.append('month', chartFilter.month.value.toString())

    const weekParam = chartFilter.year && chartFilter.week
      ? `${chartFilter.year}-${String(chartFilter.week).padStart(2, '0')}` : ''

    if (weekParam) {
      params.append('week', weekParam)
    }

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
              strokeHeight: 4,
              strokeDashArray: 5,
              // strokeHeight: 12,
              // strokeWidth: 0,
              // strokeLineCap: 'round',
            }]
          }))
        }
      ],
    }
  } catch (error) {
    console.warn('Gagal fetch data weekly, pakai dummy data:', error)
  }
}

onMounted(fetchWeeklyData)

// Auto-refresh kalau filter week berubah
watch(() => chartFilter.week, fetchWeeklyData)
</script>
