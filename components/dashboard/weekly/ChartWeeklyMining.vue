<template>
  <BaseColumnsMarkers
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Weekly Trend Mining"
    :colors="['#10b981', '#f59e0b']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import BaseColumnsMarkers from '@/components/charts/BaseColumnsMarkers.vue'

type ChartSeries = { name: string; data: any[]; type?: string }
type ChartData = { categories?: string[]; series: ChartSeries[]; colors?: string[] }

const chartFilter = useChartFilterStore()
const chartData = ref<ChartData | null>(null)

function generateDummyData(): ChartData {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const generateData = (): number[] =>
    Array.from({ length: days.length }, () => Math.floor(Math.random() * 500 + 400))

  return {
    categories: days,
    series: [
      { name: 'Actual', type: 'bar', data: generateData() },
      { name: 'Plan', type: 'line', data: generateData() }
    ]
  }
}

async function fetchWeeklyData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'weekly')

    const weekParam = chartFilter.year && chartFilter.week
      ? `${chartFilter.year}-${String(chartFilter.week).padStart(2, '0')}`
      : ''

    if (weekParam) params.append('filter_week', weekParam)

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
    chartData.value = generateDummyData()
  }
}

onMounted(fetchWeeklyData)

// Auto-refresh kalau filter week berubah
watch(() => chartFilter.week, fetchWeeklyData)
</script>
