<template>
  <BaseAreaChart
    title="Trend Mining"
    :series="chartSeries"
  />
</template>

<script setup lang="ts">
import BaseAreaChart from '@/components/charts/BaseDynamicAreaChart.vue'

const chartSeries = [
{
  name: 'Actual',
  data: Array.from({ length: 222 }, (_, i): [number, number] => {
    const date = new Date()
    date.setDate(date.getDate() - (221 - i)) // mundur 221 hari

    const timestamp = date.getTime()

    // Naik-turun bertahap dengan pola sinusoidal ditambah noise
    const base = 510 + Math.sin(i / 35) * 72  // naik-turun lembut
    const noise = Math.random() * 90 - 25      // variasi kecil
    const value = Math.round(base + noise)

    return [timestamp, value]
  })
}
//   {
//     name: 'Plan',
//     data: Array.from({ length: 1825 }, (_, i): [number, number] => {
//       const date = new Date()
//       date.setDate(date.getDate() - (1824 - i))
//       const timestamp = date.getTime()
//       const value = Math.floor(Math.random() * 1000) + 4200
//       return [timestamp, value]
//     })
//   }
]

</script>
