<template>
  <BaseDonutChart
    v-if="chartDataOreDonut?.series?.length"
    :series="chartDataOreDonut.series"
    :labels="chartDataOreDonut.labels"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import BaseDonutChart from '@/components/charts/BaseDonutChart.vue'
import { useChartFilterStore } from '@/stores/chartFilter'

const emit = defineEmits(['update:percents'])
const chartFilter = useChartFilterStore()
const chartDataOreDonut = ref<{ labels: string[]; series: number[] } | null>(null)

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
  
    const url = `${BASE_URL}dashboard/api/ore-class-chart/?${params.toString()}`
    const response = await fetch(url)
    const data = await response.json()

    chartDataOreDonut.value = {
      labels: data.labels,
      series: data.y_data
    }
    const total = data.y_data.reduce((a: number, b: number) => a + b, 0)
    const percents = data.labels.map((label: string, i: number) => {
    const percent = total > 0 ? ((data.y_data[i] / total) * 100) : 0
      return {
        label,
        value: data.y_data[i],
        percent: Math.round(percent)
      }
    })
    emit('update:percents', percents)
  } catch (error) {
    console.warn('Gagal fetch data range, pakai dummy data:', error)
  }
}
onMounted(() => {
  fetchData()
})

</script>
