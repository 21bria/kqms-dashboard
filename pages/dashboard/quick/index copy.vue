<template>

  <div class="max-w-[1400px] mx-auto space-y-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Quick Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Overview of your nickel mining operations</p>
    </div>
    <div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <!-- Filter Section -->
      <div class="lg:col-span-2">
        <div class="flex flex-wrap gap-4 items-center justify-end mb-2">
          <div class="flex items-center space-x-2">
            <input type="date" v-model="startDate" @input="emitChange"
             class="form-input px-3 py-2 rounded-md border text-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
            <button @click="applyFilters" class="bg-violet-600 text-white text-sm px-4 py-1.5 rounded hover:bg-violet-700">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                fill="#e3e3e3">
                <path
                  d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Card C: Ore Quality -->

      <!-- <MetricCard  > -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-1">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400"> Ore Totals</p>
              <h3 class="text-2xl font-bold mt-1">{{ formatShortNumber(stats.totalOre) }}</h3>
              <p class="text-sm mt-2">
                <span class="text-emerald-600 dark:text-emerald-500 font-medium">90%</span>
                <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
              </p>
            </div>
            <div class="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="currentColor">
                <path
                  d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Top soil</p>
              <h3 class="text-2xl font-bold mt-1">{{ formatShortNumber(totalTopSoil) }}</h3>
              <p class="text-sm mt-2">
                <span class="text-red-600 dark:text-red-500 font-medium">-0.8%</span>
                <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
              </p>
            </div>
            <div class="bg-secondary-50 dark:bg-secondary-900/30 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-600 dark:text-secondary-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Waste</p>
              <h3 class="text-2xl font-bold mt-1">{{ formatShortNumber(totalsWaste) }}</h3>
              <p class="text-sm mt-2">
                <span class="text-emerald-600 dark:text-emerald-500 font-medium">+1</span>
                <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
              </p>
            </div>
            <div class="bg-accent-50 dark:bg-accent-900/30 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                class="h-6 w-6 text-accent-600 dark:text-accent-400" fill="currentColor">
                <path
                  d="M120-160v-520l160 120 200-280 200 160h160v520H120Zm200-120 160-220 280 218v-318H652L496-725 298-447l-98-73v144l120 96Z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Others</p>
              <h3 class="text-2xl font-bold mt-1">{{ formatShortNumber(totalOthers) }}</h3>
              <p class="text-sm mt-2">
                <span class="text-emerald-600 dark:text-emerald-500 font-medium">0.5%</span>
                <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
              </p>
            </div>
            <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">

              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                class="h-6 w-6 text-green-600 dark:text-green-400" fill="currentColor">
                <path
                  d="M480-120 232-360l-112 80v-98l120-86 245 238 167-134h188v80H680L480-120Zm0-360L305-655 120-520v-99l193-141 175 175 352-255v99L480-480Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- </MetricCard> -->
      <div class="lg:col-span-2">
        <MetricCard title="Daily Productions" footer="Today's average">
          <BaseAreaChart v-if="chartDataDaily" :series="chartDataDaily.series" :categories="chartDataDaily.categories"
            title="Actual vs Plan Daily" :colors="['#3b82f6', '#f59e0b']" />
        </MetricCard>
      </div>
    </div>
    <!-- Quick stats -->

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Card C: Ore Quality -->
      <div class="lg:col-span-2">
        <MetricCard title="Daily Selling" footer="Today's average">
          <BaseAreaChart v-if="chartDataDaily" :series="chartDataDaily.series" :categories="chartDataDaily.categories"
            title="Actual vs Plan Daily" :colors="['#3b82f6', '#f59e0b']" />
        </MetricCard>
      </div>

      <MetricCard title="Resource Allocation" footer="Current fiscal quarter">
        <BaseDonutChart v-if="chartDataDonutLokasi" :series="chartDataDonutLokasi.series"
          :labels="chartDataDonutLokasi.labels" :width="320" />
      </MetricCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- Card D: Resource Allocation -->
      <MetricCard title="Materials Allocation" footer="Current fiscal quarter">
        <BaseDonutChart v-if="chartDataDonut" :series="chartDataDonut.series" :labels="chartDataDonut.labels" />
      </MetricCard>

      <!-- Recent Alerts -->
      <MetricCard title="Recent Alerts">
        <div class="space-y-4">
          <div v-for="(alert, index) in alerts" :key="index" class="flex items-start space-x-3">
            <div :class="`rounded-full p-1.5 ${getAlertColor(alert.priority)}`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ alert.message }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ alert.time }}</p>
            </div>
          </div>
          <button
            class="w-full mt-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            View all alerts
          </button>
        </div>
      </MetricCard>

      <!-- Card C: Ore Quality -->
      <MetricCard title="the last week" footer="Today's average">
        <BaseBarChart v-if="chartDataWeek" :series="chartDataWeek.series" :categories="chartDataWeek.categories"
          :colors="['rgba(20, 184, 166, 0.7', 'rgba(20, 184, 166, 0.2)']" />
      </MetricCard>
    </div>

    <!-- Selling -->
  </div>
</template>


<script setup>


// Dashboard statistics
const totalsWaste = ref(0)
const totalTopSoil = ref(0)
const totalOthers = ref(0)

const stats = ref({
  totalOre: 0,
})

// Chart data for Production Trends
import { ref, computed, onMounted } from 'vue'
import { BASE_URL } from '@/utils/api'
import MetricCard from '~/components/dashboard/MetricCard.vue'
import BaseAreaChart from '@charts/BaseAreaChart.vue'
import BaseBarChart from '@charts/BaseBarChart.vue'
import BaseDonutChart from '@charts/BaseDonutChart.vue'


const currentYear = new Date().getFullYear()
const selectedYear = ref(currentYear)
const selectedMonth = ref({ name: 'January', value: 1 })
const selectedWeek = ref(null)
const selectedRange = ref({ start: null, end: null })

const chartData = ref(null)

onMounted(() => {
  console.log('Year:', selectedYear.value)
  console.log('Month:', selectedMonth.value)
  applyFilters()
  fetchOreStats()
  fetchMinesStats()
})

// Static Card
const fetchOreStats = async () => {
  const params = new URLSearchParams()

  if (selectedYear.value) params.append('filter_year', selectedYear.value)
  if (selectedMonth.value) params.append('filter_month', selectedMonth.value)

  try {

    const url = BASE_URL + 'api/get-ore-summary/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()
    console.log('🚀 Data dari API:', data)

    stats.value = {
      totalOre: parseFloat(data.total_ore?.[0]) || 0,
      hpal: parseFloat(data.data_hpal?.[0]) || 0,
      rkef: parseFloat(data.data_rkef?.[0]) || 0
    }
  } catch (error) {
    console.error('Gagal ambil data Static:', error)
  }
}

const fetchMinesStats = async () => {
  const params = new URLSearchParams()

  if (selectedYear.value) params.append('filter_year', selectedYear.value)
  if (selectedMonth.value) params.append('filter_month', selectedMonth.value)

  try {
    const url = BASE_URL + 'api/get-mines-bcm-summary/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()

    totalsWaste.value = parseFloat(data.data_waste?.[0]) || 0
    totalTopSoil.value = parseFloat(data.data_topsoil?.[0]) || 0
    totalOthers.value = parseFloat(data.data_orders?.[0]) || 0


  } catch (error) {
    console.error('Gagal ambil data Static:', error)
  }
}

// Chart
const applyFilters = async () => {
  const year = selectedYear.value
  const month = selectedMonth.value
  const week = selectedWeek.value
  const { start, end } = selectedRange.value
  console.log('Year:', year)
  console.log('Month:', month)
  console.log('Week:', week)

  console.log('Month (angka):', selectedMonth.value) // 


  const params = new URLSearchParams()

  if (year) params.append('filter_year', year)
  if (month) params.append('filter_month', month)
  if (week) params.append('filter_week', week)
  if (start && end) {
    params.append('date_start', start)
    params.append('date_end', end)
  }

  try {
    const url = BASE_URL + 'get-chart-data/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()

    chartData.value = {
      categories: data.x_data,
      series: [
        {
          name: 'LIM',
          data: data.y_data_material_lim.map(Number)
        },
        {
          name: 'SAP',
          data: data.y_data_material_sap.map(Number)
        }
      ]
    }
  } catch (error) {
    console.error('Gagal mengambil data:', error)
  }
}

// Chart Data Daily
const chartDataDaily = ref(null)
onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/sqms_apps/get-daily-production/') // <-- GANTI API jika nanti tersedia
    const data = await response.json()

    // Asumsi response seperti:
    // {
    //   x_data: ['1', '2', ..., '31'],
    //   y_actual: [100, 200, ..., 31 data],
    //   y_plan: [120, 220, ..., 31 data]
    // }

    chartDataDaily.value = {
      categories: data.x_data,
      series: [
        {
          name: 'Actual',
          data: data.y_actual.map(Number)
        },
        {
          name: 'Plan',
          data: data.y_plan.map(Number)
        }
      ]
    }

  } catch (error) {
    console.warn('API gagal, pakai dummy data:', error)

    // Fallback dummy data

    const jamLabels = [
      '07', '08', '09', '10', '11', '12',
      '13', '14', '15', '16', '17', '18',
      '19', '20', '21', '22', '23',
      '00', '01', '02', '03', '04', '05', '06'
    ]

    const generateTrendSeries = () => {
      const data = []
      let current = 700

      for (let i = 0; i < jamLabels.length; i++) {
        const jam = jamLabels[i]

        if (jam === '12:00' || jam === '00:00') {
          data.push(0)
          continue
        }

        // Acak: naik tajam atau turun tajam
        const direction = Math.random() > 0.5 ? 1 : -1
        const movement = direction * (Math.random() * 250 + 100) // tajam

        current += movement
        current = Math.max(300, Math.min(1100, current)) // batasi supaya wajar

        // Tambah noise kecil
        const noise = (Math.random() - 0.5) * 60
        data.push(Math.round(current + noise))
      }

      return data
    }

    chartDataDaily.value = {
      categories: jamLabels,
      series: [
        {
          name: 'Actual',
          type: 'column',
          data: generateTrendSeries()
        },
        {
          name: 'Plan',

          data: generateTrendSeries()
        }
      ]
    }

  }
})

const chartDataWeek = ref(null)

onMounted(async () => {
  try {
    const url = BASE_URL + 'api/get-ore-summary/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()

    // Asumsi struktur response:
    // {
    //   x_data: ['Jan', 'Feb', ..., 'Dec'],
    //   y_actual: [...],
    //   y_plan: [...]
    // }

    chartDataWeek.value = {
      categories: data.x_data,
      series: [
        { name: 'Actual', data: data.y_actual.map(Number) },
        { name: 'Plan', data: data.y_plan.map(Number) }
      ]
    }

  } catch (error) {
    console.warn('API gagal, pakai dummy monthly:', error)

    // Di dalam catch block
    const today = new Date()
    const categories = []

    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(today.getDate() - i)
      const day = d.getDate()
      const month = d.toLocaleString('default', { month: 'short' }) // Misal 'Jun'
      categories.push(`${day} ${month}`)
    }

    // Fallback dummy untuk 7 hari bulan
    chartDataWeek.value = {
      categories,  // ['29 May', '30 May', ..., '4 Jun']
      series: [
        {
          name: 'Actual',
          type: 'column',
          data: [1200, 1400, 1300, 1500, 1600, 1200, 1300]
        },
        {
          name: 'Plan',
          type: 'column',
          data: [1250, 1450, 1350, 1550, 1650, 1800, 1400]
        },
        // {
        //   name: 'Cumulative',
        //   type: 'line',
        //   data: [1200, 2600, 3900, 5400, 7000, 8700, 9900]
        // }
      ]
    }
  }
})

// Chart data for Resource Allocation
const chartDataDonut = ref(null)
const chartDataDonutLokasi = ref(null)

const generateDonutLokasiDummy = () => {
  const labels = ['Dome A', 'Dome B', 'Dome C', 'Dome D']
  const data = labels.map(() => Math.floor(Math.random() * 150) + 50) // 50–200

  return {
    labels,
    series: data
  }
}
const generateDonutDummy = () => {
  const labels = ['Waste', 'OB', 'Topsoil', 'Quarry', 'Biomass']
  const data = labels.map(() => Math.floor(Math.random() * 200) + 100) // 100–300

  return {
    labels,
    series: data
  }
}

onMounted(async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/sqms_apps/get-daily-production/') // <-- GANTI API jika nanti tersedia
    const data = await response.json()

  } catch (error) {
    console.warn('API gagal, pakai dummy weekly + donut:', error)

    //  Tambah data donut dummy
    chartDataDonut.value = generateDonutDummy()
    chartDataDonutLokasi.value = generateDonutLokasiDummy()
  }
})


// Recent alerts
const alerts = ref([
  { message: 'Excavator #7 maintenance required', priority: 'medium', time: '35 minutes ago' },
  { message: 'Safety check overdue for Site B', priority: 'high', time: '2 hours ago' },
  { message: 'Production target reached for Area 4', priority: 'low', time: '5 hours ago' },
  { message: 'New regulations update available', priority: 'medium', time: '1 day ago' }
])

// Helper functions
const formatNumber = (num) => {
  if (!num || isNaN(num)) return '0'
  return Number(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const formatShortNumber = (num) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

const getAlertColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500'
    case 'medium':
      return 'bg-orange-500'
    case 'low':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

</script>