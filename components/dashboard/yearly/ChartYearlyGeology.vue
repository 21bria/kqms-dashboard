<template>

  <!-- Chart -->
  <BaseStackedColumns v-if="chartData?.series?.length" :series="chartData.series" :categories="chartData.categories" 
    :colors="['#845adf', '#23b7e5', '#f5b849', '#e6533c']" />

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import BaseStackedColumns from '@/components/charts/BaseStackedColumns.vue'

type ChartSeries = { name: string; data: number[]; type?: string }
type ChartData = { categories: string[]; series: ChartSeries[] }

const chartFilter = useChartFilterStore()

const chartData = ref<ChartData | null>(null)


async function fetchYearlyData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'yearly')
    if (chartFilter.year) params.append('year', chartFilter.year.toString())

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
    console.warn('Gagal fetch data yearly, pakai dummy:', error)
  }
}

// Fetch saat component mount
onMounted(fetchYearlyData)

// Optional: Auto-refresh saat filter tahun berubah
watch(() => chartFilter.year, fetchYearlyData)
</script>
