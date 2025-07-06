<template>
  <div class="max-w-[1640px] mx-auto px-4 space-y-6">
    <!-- <div class="max-w-full mx-auto px-4 py-6 space-y-6"> -->
    <!-- Title -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Overview of your nickel mining operations</p>
    </div>

    <!-- Filter -->
    <div class="flex justify-end">
      <div class="flex items-center gap-2">
        <input type="date" v-model="startDate" @input="emitChange"
          class="form-input px-3 py-2 rounded-md border text-sm bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
        <button @click="applyFilters" class="bg-violet-600 text-white text-sm px-4 py-2 rounded hover:bg-violet-700">
          Filter
        </button>
      </div>
    </div>


    <div class="grid grid-cols-12 gap-6">
      <div class="xl:col-span-7 col-span-12">
        <div class="grid grid-cols-12 gap-4">

          <div class="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
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
          </div>

          <div class="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
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
          </div>

          <div class="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
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

          </div>

          <!-- Mine Production Chart -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div>
              <MetricCard title="Mine Productions" footer="By date">
                <BaseLineColumnArea v-if="chartData" :series="chartData.series" :categories="chartData.categories"
                  title="Monthly Trend Mining" :colors="['#34d399', '#f5b849']" />
                <!-- Slot footer -->
                <template #footer>
                </template>
              </MetricCard>

            </div>
          </div>

          <!-- Selling Chart -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div>
              <MetricCard title="Selling Chart">
                <BaseLineColumnArea v-if="chartDataSelling?.series?.length" :series="chartDataSelling.series"
                  :categories="chartDataSelling.categories" :colors="['#3b82f6', '#34d399', '#f5b849']" />
                <!-- Slot footer -->
                <template #footer>
                </template>
              </MetricCard>

            </div>
          </div>
          <!-- Inventory Chart -->
          <div class="xl:col-span-12 col-span-12">
            <div class="bg-white dark:bg-gray-800">

              <MetricCard title="Inventory Chart">
                <!-- Slot header -->
                <template #header>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm p-2">
                    <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <p class="text-gray-500 dark:text-gray-400">Current</p>
                      <p class="text-lg font-semibold text-orange-500">157.5K</p>
                    </div>
                    <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <p class="text-gray-500 dark:text-gray-400">Limonite</p>
                      <p class="text-lg font-semibold text-gray-800 dark:text-white">78.0K</p>
                    </div>
                    <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <p class="text-gray-500 dark:text-gray-400">Saprolite</p>
                      <p class="text-lg font-semibold text-gray-800 dark:text-white">79.5K</p>
                    </div>
                    <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <p class="text-gray-500 dark:text-gray-400">Last Updated</p>
                      <p class="text-sm font-semibold text-gray-800 dark:text-white">June 19, 2025</p>
                    </div>
                  </div>
                </template>
                <BaseLineColumnArea v-if="chartDataInventory?.series?.length" :series="chartDataInventory.series"
                  :categories="chartDataInventory.categories" :colors="['#845adf', '#23b7e5', '#f5b849']" />
                <!-- Slot footer -->
                <template #footer>
                </template>
              </MetricCard>
            </div>

                   <MetricCard title="Ore Chart">
              <!-- Slot header -->
              <template #header>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm p-2">

                  <div
                    class=" xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg ">
                    <p class="text-gray-500 dark:text-gray-400">Limonite</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">78.0K</p>
                    <p class="text-sm">
                      <span class="text-emerald-600 dark:text-emerald-500 font-medium">90%</span>
                      <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
                    </p>
                  </div>
                  <div
                    class="xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <p class="text-gray-500 dark:text-gray-400">Saprolite</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">79.5K</p>
                    <p class="text-sm">
                      <span class="text-emerald-600 dark:text-emerald-500 font-medium">90%</span>
                      <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
                    </p>
                  </div>
                  <div
                    class="xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <p class="text-gray-500 dark:text-gray-400">Totals Ore</p>
                    <p class="text-sm font-semibold text-gray-800 dark:text-white">150K</p>
                    <p class="text-sm">
                      <span class="text-emerald-600 dark:text-emerald-500 font-medium">90%</span>
                      <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
                    </p>
                  </div>
                </div>
              </template>

              <!-- Chart -->
              <BaseAreaChart v-if="chartDataOre?.series?.length" :series="chartDataOre.series"
                :categories="chartDataOre.categories" :colors="['#3b82f6', '#34d399']" />

              <!-- Footer (optional) -->
              <template #footer>
                <div class="text-xs text-right text-gray-400 dark:text-white/50">Chart data last refreshed</div>
              </template>
            </MetricCard>
          </div>

        </div>

      </div>

      <div class="xl:col-span-5 col-span-12">
        <div class="grid grid-cols-12 gap-x-6 gap-4">

          <div class="xxl:col-span-5 xl:col-span-5 col-span-12 gap-4">
            <div class="bg-violet-500 rounded-lg text-white shadow-sm p-7">
              <div class="box-body text-white">
                <span class="avatar avatar-xxl !border-0">
                  <img src="" alt="">
                </span>
                <div class="upgrade-card-content">
                  <span class="opacity-[0.7] font-normal mb-1 !text-white">Selling update
                    !</span>
                  <span class="text-[1.5625rem] font-semibold block mb-[1.5rem] upgrade-text !text-white"
                    id="total-selling">0.90</span>
                  <button type="button"
                    class="ti-btn !py-1 !px-2 bg-light text-defaulttextcolor !text-[0.75rem] font-medium ti-btn-wave">View
                    all</button>
                </div>
              </div>
            </div>
            <!-- Selling Composition (RadialBar Compact) -->
            <div class="grid grid-cols-1 gap-3 mt-3">
              <BaseRadialBar :data="dataList" />
            </div>
          </div>
          <!-- Materials By Class
            -->
          <div class="xxl:col-span-7 xl:col-span-7 col-span-12">
            <MetricCard title="Materials By Class">
              <!-- Donut Chart Centered -->
              <div class="flex justify-center items-center w-full">
                <BaseDonutChart v-if="chartDataOreDonut?.series?.length" :series="chartDataOreDonut.series"
                  :labels="chartDataOreDonut.labels" />
                <div v-else class="text-sm text-gray-400 text-center py-6"></div>
              </div>

              <!-- Slot footer -->
              <template #footer>
                <div v-if="chartDataOreDonut?.labels?.length"
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
                  <div v-for="(label, i) in chartDataOreDonut.labels" :key="label" class="p-2">
                    <p class="text-xs text-gray-500 dark:text-white/50 font-medium">
                      {{ label }}
                    </p>
                    <p class="text-sm font-bold text-gray-800 dark:text-white">
                      {{ chartDataOreDonut.series[i] }}%
                    </p>
                  </div>
                </div>

                <!-- Optional fallback saat loading -->
                <div v-else class="text-sm text-gray-400 text-center py-4">
                  Loading material breakdown...
                </div>
              </template>
            </MetricCard>

          </div>
          <!-- Ore Chart -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
            <MetricCard title="Ore Chart">
              <!-- Slot header -->
              <template #header>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm p-2">

                  <div
                    class=" xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg ">
                    <p class="text-gray-500 dark:text-gray-400">Limonite</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">78.0K</p>
                    <p class="text-sm">
                      <span class="text-emerald-600 dark:text-emerald-500 font-medium">90%</span>
                      <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
                    </p>
                  </div>
                  <div
                    class="xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <p class="text-gray-500 dark:text-gray-400">Saprolite</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">79.5K</p>
                    <p class="text-sm">
                      <span class="text-emerald-600 dark:text-emerald-500 font-medium">90%</span>
                      <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
                    </p>
                  </div>
                  <div
                    class="xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <p class="text-gray-500 dark:text-gray-400">Totals Ore</p>
                    <p class="text-sm font-semibold text-gray-800 dark:text-white">150K</p>
                    <p class="text-sm">
                      <span class="text-emerald-600 dark:text-emerald-500 font-medium">90%</span>
                      <span class="text-gray-500 dark:text-gray-400 ml-1">vs target</span>
                    </p>
                  </div>
                </div>
              </template>

              <!-- Chart -->
              <BaseAreaChart v-if="chartDataOre?.series?.length" :series="chartDataOre.series"
                :categories="chartDataOre.categories" :colors="['#3b82f6', '#34d399']" />

              <!-- Footer (optional) -->
              <template #footer>
                <div class="text-xs text-right text-gray-400 dark:text-white/50">Chart data last refreshed</div>
              </template>
            </MetricCard>
          </div>


          <!-- Table Dome Ach -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div>
              <!-- <MetricCard title="Data by dome">
              </MetricCard> -->

              <!-- Recent Alerts -->
              <MetricCard title="Recent Alerts">
                <div class="space-y-3 mt-3">
                  <div v-for="(alert, index) in alerts" :key="index" class="flex items-start space-x-3 ">
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

                </div>
                <!-- Slot footer -->
                <template #footer>
                  <button
                    class="w-full mt-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    View all alerts
                  </button>
                </template>
              </MetricCard>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>



<script setup lang="ts">

import { ref, computed, onMounted } from 'vue'
import MetricCard from '@/components/dashboard/MetricCard.vue'
import BaseAreaChart from '@/components/charts/BaseAreaChart.vue'
import BaseLineColumnArea from '@/components/charts/BaseLineColumnArea.vue'
import BaseDonutChart from '@/components/charts/BaseDonutChart.vue'
import BaseRadialBar from '@/components/charts/BaseRadialBar.vue'


// Dashboard statistics
const totalsWaste = ref(0)
const totalTopSoil = ref(0)

const stats = ref({
  totalOre: 0,
})

// Chart Data Daily
// Chart Data Daily
interface ChartSeries {
  name: string
  type: 'area' | 'line' | 'bar' | 'column' | 'donut'
  data: number[]
}

interface ChartData {
  categories: string[]
  series: ChartSeries[]
}

const chartData = ref<ChartData | null>(null)
const chartDataOre = ref<ChartData | null>(null)
const chartDataInventory = ref<ChartData | null>(null)
const chartDataSelling = ref<ChartData | null>(null)
const chartDataOreDonut = ref<{ labels: string[]; series: number[] } | null>(null) // ✅ donut ref
const dataList = ref([])

const chartDataOreClass = ref({
  labels: ['LGLO', 'MGLO', 'HGLO', 'LGSO', 'MGSO', 'HGSO'],
  series: [17, 13, 29, 13, 12, 17]
})


function generateDummyMonthlyData(): ChartData {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
  const seriesA = days.map(() => Math.floor(Math.random() * 800 + 200)) // actual
  const seriesB = days.map(() => Math.floor(Math.random() * 800 + 200)) // plan

  return {
    categories: days,
    series: [
      { name: 'Actual', type: 'area', data: seriesA },
      { name: 'Plan', type: 'area', data: seriesB }
    ]
  }
}
function generateDummyOreData(): ChartData {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`)
  const seriesA = days.map(() => Math.floor(Math.random() * 800 + 200)) // actual
  const seriesB = days.map(() => Math.floor(Math.random() * 800 + 200)) // plan

  return {
    categories: days,
    series: [
      { name: 'Limonite', type: 'area', data: seriesA },
      { name: 'Saprolite', type: 'area', data: seriesB }
    ]
  }
}
function generateDummyInventory(): ChartData {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`)

  const mining = days.map(() => Math.floor(Math.random() * 400 + 200)) // Mining
  const selling = days.map(() => Math.floor(Math.random() * 360 + 150)) // Selling

  // Hitung balance kumulatif seperti stock balance harian
  const balance: number[] = []
  let currentBalance = 0
  for (let i = 0; i < days.length; i++) {
    currentBalance += mining[i] - selling[i]
    balance.push(currentBalance)
  }

  return {
    categories: days,
    series: [
      { name: 'Mining', type: 'area', data: mining },
      { name: 'Selling', type: 'area', data: selling },
      { name: 'Balance', type: 'line', data: balance },
    ]
  }
}
function generateDummySelling(): ChartData {
  const days = Array.from({ length: 30 }, (_, i) => `${i + 1}`)

  const internal = days.map(() => Math.floor(Math.random() * 320 + 150)) // internal
  const surveyor = days.map(() => Math.floor(Math.random() * 330 + 150)) // surveyor
  const official = days.map(() => Math.floor(Math.random() * 320 + 150)) // official

  // Hitung balance kumulatif
  return {
    categories: days,
    series: [
      { name: 'Internal', type: 'area', data: internal },
      { name: 'Surveyor', type: 'area', data: surveyor },
      { name: 'Official', type: 'area', data: official },
    ]
  }
}

// Fungsi untuk donut chart
function generateDonutOreDummy() {
  const labels = ['Waste', 'OB', 'Topsoil', 'Quarry', 'Biomass']
  const data = labels.map(() => Math.floor(Math.random() * 200) + 100)
  return { labels, series: data }
}

onMounted(async () => {
  try {
    throw new Error('Simulasi error') // hapus ini nanti
  } catch (error) {
    console.warn('API gagal, pakai dummy data:', error)
    chartData.value = generateDummyMonthlyData()
    chartDataOre.value = generateDummyOreData()
    chartDataInventory.value = generateDummyInventory()
    chartDataSelling.value = generateDummySelling()
    chartDataOreDonut.value = generateDonutOreDummy() // ✅ panggil di sini
    dataList.value = generateDummyRadialBarData()
  }
})

function generateDummyRadialBarData() {
  return [
    {
      label: 'Saprolite',
      percent: Math.floor(Math.random() * 30 + 40),
      value: (Math.random() * 0.5 + 0.3).toFixed(2),
      color: '#23b7e5'
    },
    {
      label: 'Limonite',
      percent: Math.floor(Math.random() * 30 + 40),
      value: (Math.random() * 0.5 + 0.3).toFixed(2),
      color: '#fbbf24'
    }
  ]
}

// Helper functions
const formatNumber = (num: number) => {
  if (!num || isNaN(num)) return '0'
  return Number(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const formatShortNumber = (num: number) => {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B'
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
  return num.toString()
}

// Recent alerts
const alerts = ref([
  { message: 'Excavator #7 maintenance required', priority: 'medium', time: '35 minutes ago' },
  { message: 'Safety check overdue for Site B', priority: 'high', time: '2 hours ago' },
  { message: 'Production target reached for Area 4', priority: 'low', time: '5 hours ago' },
  { message: 'New regulations update available', priority: 'medium', time: '1 day ago' }
])

const getAlertColor = (priority: string) => {
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