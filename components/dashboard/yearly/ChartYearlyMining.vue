<template>
  <BaseColumnsMarkers v-if="chartData" :series="chartData.series" :categories="chartData.categories"
    title="Yearly Trend Mining" :colors="['#34d399', '#f5b849']" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import BaseColumnsMarkers from '@/components/charts/BaseColumnsMarkers.vue'

type ChartSeries = { name: string; data: any[]; type?: string }
type ChartData = { categories?: string[]; series: ChartSeries[]; colors?: string[] }


const chartFilter = useChartFilterStore()

const chartData = ref<ChartData | null>(null)

async function fetchYearlyData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'yearly')
    if (chartFilter.year) params.append('filter_year', chartFilter.year.toString())

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
              //  strokeDashArray: 2,
              // strokeHeight: 11,
              // strokeWidth: 0,
              // strokeLineCap: 'round',
            }]
          }))
        }
      ],

    }

  } catch (error) {
    console.warn('Gagal fetch data yearly, pakai dummy:', error)
  }
}

// Fetch saat component mount
onMounted(fetchYearlyData)

// Optional: Auto-refresh saat filter tahun berubah
watch(() => chartFilter.year, fetchYearlyData)
</script>
