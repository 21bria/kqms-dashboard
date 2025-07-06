<template>
  <BaseAreaChart
    v-if="chartData"
    :series="chartData.series"
    :categories="chartData.categories"
    title="Daily Trend Selling"
    :colors="['#3b82f6', '#f59e0b']"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'

//  Define type
interface ChartData {
  categories: string[]
  series: {
    name: string
    data: number[]
    type?: string 
  }[]
}

// ✅ Typing
const chartData = ref<ChartData | null>(null)

// ✅ Dummy function
function generateDummyDailyData(): ChartData {
  const jamLabels = ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '00', '01', '02', '03', '04', '05', '06']

  const generateTrendSeries = (): number[] => {
    const data: number[] = []
    let current = 700
    for (let i = 0; i < jamLabels.length; i++) {
      const direction = Math.random() > 0.5 ? 1 : -1
      const movement = direction * (Math.random() * 250 + 100)
      current += movement
      current = Math.max(300, Math.min(1100, current))
      const noise = (Math.random() - 0.5) * 60
      data.push(Math.round(current + noise))
    }
    return data
  }

  return {
    categories: jamLabels,
    series: [
      { name: 'Actual', type:'bar',
        data: generateTrendSeries() },
      { name: 'Plan', data: generateTrendSeries() }
    ]
  }
}

// ✅ On mount
onMounted(async () => {
  try {
    const res = await fetch('/api/daily-data')
    const data = await res.json()

    chartData.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', data: data.y_actual.map(Number) },
        { name: 'Plan', data: data.y_plan.map(Number) }
      ]
    }
  } catch (error) {
    console.warn('Gagal ambil data harian, pakai dummy:', error)
    chartData.value = generateDummyDailyData()
  }
})
</script>
