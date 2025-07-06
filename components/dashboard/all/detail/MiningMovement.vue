<template>
      <div class="space-y-6" >
        <!-- Selling Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">All Productions</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Today's average</p>
            </div>
          </div>
      <div class="h-64">
        <BaseAreaChart v-if="chartData" :series="chartData.series" :categories="chartData.categories"
          :title="chartTitle" :colors="['#3b82f6', '#f59e0b']" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import BaseAreaChart from '@charts/BaseAreaChart.vue'

const props = defineProps({
  filterType: String,
  filterYear: String,
  filterMonth: String,
  filterWeek: String,
  dateStart: String,
  dateEnd: String
})

const chartData = ref(null)
const chartTitle = ref('')

const generateDummy = (count = 10, base = 500) => {
  const data = []
  for (let i = 0; i < count; i++) {
    base += (Math.random() - 0.5) * 150
    data.push(Math.max(300, Math.round(base)))
  }
  return data
}

const generateChart = () => {
  const type = props.filterType

  let categories = []
  let count = 10
  let title = ''

  switch (type) {
    case 'daily':
      categories = [
        '07', '08', '09', '10', '11', '12',
        '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23',
        '00', '01', '02', '03', '04', '05', '06'
      ]
      count = categories.length
      title = 'Daily Production Overview'
      break
    case 'weekly':
      categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      count = categories.length
      title = 'Weekly Production Overview'
      break
    case 'monthly':
      const month = parseInt(props.filterMonth) || 1
      const year = parseInt(props.filterYear) || new Date().getFullYear()
      const daysInMonth = new Date(year, month, 0).getDate()

      categories = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`) // ['1', '2', ..., '30']
      count = daysInMonth
      title = `Monthly Production (${year}-${month.toString().padStart(2, '0')})`
      break

    case 'yearly':
      categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      title = 'Yearly Production Overview'
      break
    case 'range':
      if (props.dateStart && props.dateEnd) {
        const startDate = new Date(props.dateStart)
        const endDate = new Date(props.dateEnd)
        const dates = []

        while (startDate <= endDate) {
        const formatted = startDate.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short'
          }) // 
          dates.push(formatted)
          startDate.setDate(startDate.getDate() + 1)
        }

        categories = dates
        count = categories.length
        title = 'Custom Range Production Overview'
      } else {
        categories = ['Invalid Range']
        title = 'Invalid Date Range'
      }
      break
    case 'all':
      categories = ['2021', '2022', '2023', '2024', '2025']
      count = categories.length
      title = ''
      break
    default:
      categories = ['A', 'B', 'C']
      count = categories.length
      title = 'Default Chart'
  }

  chartTitle.value = title
  chartData.value = {
    categories,
    series: [
      {
        name: 'Actual',
        type: 'column',
        data: generateDummy(count)
      },
      // {
      //   name: 'Plan',
      //   data: generateDummy(count)
      // }
    ]
  }
}

onMounted(generateChart)
watch(() => [props.filterType], generateChart)
</script>
