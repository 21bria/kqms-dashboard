<template>
  <BaseLineColumnArea
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Monthly Trend Mining"
    :colors="[ '#f5b849','#34d399']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import { BASE_URL } from '@/utils/api'
import BaseLineColumnArea from '@/components/charts/BaseLineColumnArea.vue'

interface ChartSeries {
  name: string
  data: number[]
  type: string
}

interface ChartData {
  categories: string[]
  series: ChartSeries[]
}

// Ambil filter dari store Pinia
const chartFilter = useChartFilterStore()

const chartData = ref<ChartData | null>(null)



async function fetchChartData() {
  try {
    const params = new URLSearchParams()
    params.append('filter_type', 'monthly') // sesuai komponen ini
    if (chartFilter.year) params.append('filter_year', chartFilter.year.toString())
    if (chartFilter.month) params.append('filter_month', chartFilter.month.value.toString())

    const url = `${BASE_URL}dashboard/api/summary/mines/ore?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    console.log("Data chart dari backend:", data)

    chartData.value = {
      categories: data.x_data,
      series: [
         { name: 'Plan', type: 'area', data: data.total_plan },
        { name: 'Actual', type: 'area', data: data.total_tonnage }
       
      ]
    }
  } catch (error) {
    console.warn('Gagal fetch chart, pakai dummy data:', error)
   
  }
}

// Initial load
onMounted(fetchChartData)

// Re-fetch jika bulan atau tahun berubah
watch(() => [chartFilter.year, chartFilter.month], fetchChartData)

</script>


