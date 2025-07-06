<template>
  <!-- <div class="max-w-8xl mx-auto  sm:px-2 lg:px-8 space-y-2"> -->
  <div class="max-w-[1550px] mx-auto sm:px-2 space-y-0">
    <!-- Header Section -->
    <div class="mb-2">
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">Dashboard Review</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Overview of your nickel mining operations</p>
    </div>

    <!-- Filter Section -->
    <div class="p-0 mb-0">
      <div class="flex flex-wrap gap-2 items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Filter Data</h3> -->
        </div>
        <div class="flex items-center space-x-2">

          <div class="flex flex-wrap gap-4 items-center justify-end mb-2">
            <FilterControls @apply="handleApply" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Left Column - Mining Section -->
      <div class="space-y-6">
        <NuxtLink to="/dashboard/mining"
          class="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mining Production</h2>
        </NuxtLink>

        <!-- Mining Stats Cards -->
        <template v-if="isLoading">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </template>

        <template v-else>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="TMM" :value="activeStat?.total_actual ?? 0" :progressA="activeStat?.achievement ?? 0"
              :progressB="comparisonStat?.achievement ?? 0" :labelA="activeLabel" :labelB="comparisonLabel"
              iconBg="bg-primary-50 dark:bg-primary-900/30" :to="openTmmModal">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                  class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="currentColor">
                  <path
                    d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z" />
                </svg>
              </template>
            </StatCard>
            <StatCard title="Ore" :value="activeStat?.total_ore ?? 0" :progressA="activeStat?.achievement_ore ?? 0"
              :progressB="comparisonStat?.achievement_ore ?? 0" :labelA="activeLabel" :labelB="comparisonLabel"
              iconBg="bg-secondary-50 dark:bg-secondary-900/30" :to="openTmmModal">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary-600 dark:text-secondary-400"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </template>
            </StatCard>
            <StatCard title="Non Ore" :value="activeStat?.total_non_ore ?? 0"
              :progressA="activeStat?.achievement_non_ore ?? 0" :progressB="comparisonStat?.achievement_non_ore ?? 0"
              :labelA="activeLabel" :labelB="comparisonLabel" iconBg="bg-accent-50 dark:bg-accent-900/30"
              :to="openTmmModal">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                  class="h-5 w-5 text-accent-600 dark:text-accent-400" fill="currentColor">
                  <path
                    d="M120-160v-520l160 120 200-280 200 160h160v520H120Zm200-120 160-220 280 218v-318H652L496-725 298-447l-98-73v144l120 96Z" />
                </svg>
              </template>
            </StatCard>
          </div>

        </template>

        <!-- Ore Type Distribution -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard title="Limonite" :value="activeStat?.total_limonite ?? 0"
            :progressA="activeStat?.achievement_limonite ?? 0" :progressB="comparisonStat?.achievement_limonite ?? 0"
            :labelA="activeLabel" :labelB="comparisonLabel" iconBg="bg-yellow-50 dark:bg-yellow-900/30">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                class="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="currentColor">
                <path
                  d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z" />
              </svg>
            </template>
          </StatCard>
          <StatCard title="Saprolite" :value="activeStat?.total_saprolite ?? 0"
            :progressA="activeStat?.achievement_saprolite ?? 0" :progressB="comparisonStat?.achievement_saprolite ?? 0"
            :labelA="activeLabel" :labelB="comparisonLabel" iconBg="bg-green-50 dark:bg-green-900/30">
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </template>
          </StatCard>
        </div>

        <!-- Mining Productions Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mining Productions</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Today's average</p>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <NuxtLink :to="{
                  path: '/dashboard/mining-detail',
                  query: {
                    filter_type: selectedChartType,
                  }
                }">
                  <a class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">View Details<i
                      class="bi bi-box-arrow-up-right text-[0.6875rem] ms-2" /></a>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="h-64">
            <!-- Tampilkan chart default saat belum ada yang dipilih -->

            <!-- <ChartMonthlyMining v-if="selectedChartType === 'monthly'" :year="selectedYear" :month="selectedMonthObj" /> -->
            <!-- Tampilkan chart sesuai pilihan -->
            <ChartDailyMining v-if="selectedChartType === 'daily'" />
            <ChartWeeklyMining v-else-if="selectedChartType === 'weekly'" />
            <ChartMonthlyMining v-else-if="selectedChartType === 'monthly'" />
            <ChartRangeMining v-else-if="selectedChartType === 'range'" />
            <ChartYearlyMining v-else-if="selectedChartType === 'yearly'" />
            <ChartAllMining v-else-if="selectedChartType === 'all'" />
          </div>
        </div>
        <!-- Left Column - Inventory Section -->
        <div class="space-y-6 mt-3">
          <!-- <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Inventory</h2> -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-2xl">📍</span>
                <h2 class="text-lg font-semibold">Trend Inventory</h2>
              </div>
              <NuxtLink to="/dashboard/inventory" class="text-blue-600 text-sm font-medium hover:underline">View Details</NuxtLink>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mt-4 mb-4">
              <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-gray-500 dark:text-gray-400">Current</p>
                <p class="text-lg font-semibold text-orange-500">
                  {{ formatShortNumber(statsIventory.total_stock) || 0 }}
                </p>
              </div>
              <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-gray-500 dark:text-gray-400">Limonite</p>
                <p class="text-lg font-semibold text-gray-800 dark:text-white">
                  {{ formatShortNumber(statsIventory.lim_stock) || 0 }}
                </p>
              </div>
              <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-gray-500 dark:text-gray-400">Saprolite</p>
                <p class="text-lg font-semibold text-gray-800 dark:text-white">
                  {{ formatShortNumber(statsIventory.sap_stock) || 0 }}
                </p>
              </div>
              <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <p class="text-gray-500 dark:text-gray-400">Last Updated</p>
                <p class="text-lg font-semibold text-gray-800 dark:text-white">June 19, 2025</p>
              </div>
            </div>
            <div class="h-64">
              <ChartMonthlyInventory v-if="selectedChartType === ''" />
              <!-- Tampilkan chart sesuai pilihan -->
              <!-- <ChartMonthlyInventory v-if="selectedChartType === 'daily'" /> -->
              <ChartWeeklyInventory v-else-if="selectedChartType === 'weekly'" />
              <ChartMonthlyInventory v-else-if="selectedChartType === 'monthly'" />
              <ChartRangeInventory v-else-if="selectedChartType === 'range'" />
              <ChartYearlyInventory v-else-if="selectedChartType === 'yearly'" />
              <ChartAllInventory v-else-if="selectedChartType === 'all'" />
            </div>

          </div>
        </div>
      </div>

      <!-- Right Column - Selling Section -->
      <div class="space-y-6">
        <NuxtLink to="/dashboard/selling"
          class="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Selling Operations</h2>
        </NuxtLink>
        <!-- Selling Stats Cards -->
        <template v-if="isLoading">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Total Card -->
            <StatCard title="Totals" :value="0" :progressA="0" :progressB="0" iconBg="bg-blue-50 dark:bg-blue-900/30"
              :to="openTmmModal">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                  class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor">
                  <path
                    d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z" />
                </svg>
              </template>
            </StatCard>

            <!-- Limonite Selling -->
            <StatCard title="Limonite" :value="0" :progressA="0" :progressB="0"
              iconBg="bg-yellow-50 dark:bg-yellow-900/30" :to="openTmmModal">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </template>
            </StatCard>

            <!-- Saprolite Selling -->
            <StatCard title="Saprolite" :value="0" :progressA="0" :progressB="0"
              iconBg="bg-green-50 dark:bg-green-900/30" :to="openTmmModal">
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 dark:text-green-400" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </template>
            </StatCard>
          </div>
        </template>

        <!-- Selling Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Selling Performance</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">Today's average</p>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center space-x-2">
                <NuxtLink to="/dashboard/selling"
                  class="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  <a href="javascript:void(0);" class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">View
                    Details<i class="bi bi-box-arrow-up-right text-[0.6875rem] ms-2"></i></a>
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="h-64">
            <!-- Tampilkan chart default saat belum ada yang dipilih -->
            <ChartMonthlyInventory v-if="selectedChartType === ''" />
            <!-- Tampilkan chart sesuai pilihan -->
            <ChartDailySelling v-if="selectedChartType === 'daily'" />
            <ChartWeeklySelling v-else-if="selectedChartType === 'weekly'" />
            <ChartMonthlySelling v-else-if="selectedChartType === 'monthly'" />
            <ChartRangeSelling v-else-if="selectedChartType === 'range'" />
            <ChartYearlySelling v-else-if="selectedChartType === 'yearly'" />
            <ChartAllSelling v-else-if="selectedChartType === 'all'" />
          </div>
        </div>

        <!-- <MapStockpile /> -->

        <!-- Ore By Dome -->
        <OreByDome :items="statsDome.data" />

      </div>
    </div>

  </div>
  <!-- Call Modals -->
  <TmmModal v-model="isTmmModalOpen" :data="tmmData" />

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import 'leaflet/dist/leaflet.css'
import MapStockpile from '@/components/maps/MapStockpile.client.vue'
import OreByDome from '@/components/dashboard/table/OreByDome.vue'
import { formatShortNumber } from '@/utils/formatter'
import { BASE_URL } from '@/utils/api'
import FilterControls from '@/components/filters/FilterControls.vue'
import StatCard from '@/components/cards/StatCard.vue'
import TmmModal from '@/components/dashboard/modals/TmmModal.vue'
import StatCardSkeleton from '@/components/shimmer/StatCardSkeleton.vue'

// Import Chart Komponen
import ChartAllMining from '@/components/dashboard/all/ChartAllMining.vue'
import ChartAllSelling from '@/components/dashboard/all/ChartAllSelling.vue'
import ChartAllInventory from '@/components/dashboard/all/ChartAllInventory.vue'
import ChartYearlyMining from '@/components/dashboard/yearly/ChartYearlyMining.vue'
import ChartYearlySelling from '@/components/dashboard/yearly/ChartYearlySelling.vue'
import ChartYearlyInventory from '@/components/dashboard/yearly/ChartYearlyInventory.vue'
import ChartMonthlyMining from '@/components/dashboard/monthly/ChartMonthlyMining.vue'
import ChartMonthlySelling from '@/components/dashboard/monthly/ChartMonthlySelling.vue'
import ChartMonthlyInventory from '@/components/dashboard/monthly/ChartMonthlyInventory.vue'
import ChartRangeMining from '@/components/dashboard/range/ChartRangeMining.vue'
import ChartRangeSelling from '@/components/dashboard/range/ChartRangeSelling.vue'
import ChartRangeInventory from '@/components/dashboard/range/ChartRangeInventory.vue'
import ChartWeeklyMining from '@/components/dashboard/weekly/ChartWeeklyMining.vue'
import ChartWeeklySelling from '@/components/dashboard/weekly/ChartWeeklySelling.vue'
import ChartWeeklyInventory from '@/components/dashboard/weekly/ChartWeeklyInventory.vue'
import ChartDailyMining from '@/components/dashboard/daily/ChartDailyMining.vue'
import ChartDailySelling from '@/components/dashboard/daily/ChartDailySelling.vue'


const chartFilter = useChartFilterStore()

const selectedChartType = computed(() => chartFilter.type)
const selectedYear = computed(() => chartFilter.year)
const selectedMonth = computed(() => chartFilter.month)
const selectedWeek = computed(() => chartFilter.week)
const selectedRange = computed(() => chartFilter.range || { start: '', end: '' })
const selectedDate = computed(() => chartFilter.date)

interface SummaryStats {
  label: string
  total_actual: number
  total_ore: number
  total_limonite: number
  total_saprolite: number
  total_non_ore: number
  achievement: number
  achievement_ore: number
  achievement_non_ore: number
  achievement_limonite: number
  achievement_saprolite: number
}

const stats = ref<Record<string, SummaryStats>>({})

const selectedKey = computed(() => (selectedChartType.value?.toLowerCase?.() || '') as keyof typeof stats.value)
const comparisonKey = computed(() => {
  switch (selectedKey.value) {
    case 'monthly': return 'mtd'
    case 'yearly': return 'ytd'
    case 'weekly': return 'wtd'
    case 'daily': return 'daily'
    case 'range': return 'range'
    case 'all': return 'all'
    default: return ''
  }
})

const activeStat = computed(() => stats.value[selectedKey.value] || null)
const comparisonStat = computed(() => stats.value[comparisonKey.value] || null)
const activeLabel = computed(() => activeStat.value?.label || '')
const comparisonLabel = computed(() => comparisonStat.value?.label || '')

const isLoading = ref(false)  // opsional untuk tampilan loading

async function fetchOreStats(): Promise<void> {
  isLoading.value = true
  const params = new URLSearchParams()

  if (selectedChartType.value) params.append('filter_type', selectedChartType.value)
  if (selectedChartType.value === 'weekly' && selectedYear.value && selectedWeek.value) {
    const weekStr = `${selectedYear.value}-${String(selectedWeek.value).padStart(2, '0')}`
    params.append('filter_week', weekStr)
  } else {
    if (selectedYear.value) params.append('filter_year', selectedYear.value.toString())
    if (selectedMonth.value) params.append('filter_month', selectedMonth.value.value.toString())
    if (selectedWeek.value) params.append('filter_week', selectedWeek.value.toString())
  }

  if (selectedRange.value?.start && selectedRange.value?.end) {
    params.append('date_start', selectedRange.value.start)
    params.append('date_end', selectedRange.value.end)
  }

  if (selectedDate.value) params.append('filter_date', selectedDate.value)

  // Fetch data dari backend
  try {
    const url = BASE_URL + 'dashboard/api/summary/mines?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()
    stats.value = data
  } catch (error) {
    console.error('Gagal ambil data Static:', error)
    stats.value = {}
  } finally {
    isLoading.value = false
  }
}

const statsIventory = ref<any>({})

async function fetchInventoryStats(): Promise<void> {
  isLoading.value = true
  const params = new URLSearchParams()

  // Tambah filter_type
  if (selectedChartType.value) {
    params.append('filter_type', selectedChartType.value)
  }

  // Tambah year (selalu ditambahkan jika ada)
  if (selectedYear.value) {
    params.append('year', selectedYear.value.toString())
  }

  // Tambah month (pastikan ambil .value)
  if (selectedMonth.value?.value !== undefined) {
    params.append('month', selectedMonth.value.value.toString())
  }

  // Tambah week dalam format "YYYY-WW"
  if (selectedYear.value && selectedWeek.value !== undefined) {
    const weekStr = `${selectedYear.value}-${String(selectedWeek.value).padStart(2, '0')}`
    params.append('week', weekStr)
  }

  // Range mode (optional)
  if (selectedRange.value?.start && selectedRange.value?.end) {
    params.append('date_start', selectedRange.value.start)
    params.append('date_end', selectedRange.value.end)
  }

  // Daily mode (optional)
  if (selectedDate.value) {
    params.append('filter_date', selectedDate.value)
  }
  // Fetch data dari backend
  try {
    const url = BASE_URL + 'dashboard/api/inventory-summary/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()
    statsIventory.value = data
    console.log('Get data Static:', data)
  } catch (error) {
    console.error('Gagal ambil data Static:', error)
    statsIventory.value = {}
  } finally {
    isLoading.value = false
  }
}

const statsDome = ref({ data: [] })
async function fetchDomeStats(): Promise<void> {
  isLoading.value = true
  const params = new URLSearchParams()

  // Tambah filter_type
  if (selectedChartType.value) {
    params.append('filter_type', selectedChartType.value)
  }

  // Tambah year (selalu ditambahkan jika ada)
  if (selectedYear.value) {
    params.append('year', selectedYear.value.toString())
  }

  // Tambah month (pastikan ambil .value)
  if (selectedMonth.value?.value !== undefined) {
    params.append('month', selectedMonth.value.value.toString())
  }

  // Tambah week dalam format "YYYY-WW"
  if (selectedYear.value && selectedWeek.value !== undefined) {
    const weekStr = `${selectedYear.value}-${String(selectedWeek.value).padStart(2, '0')}`
    params.append('week', weekStr)
  }

  // Range mode (optional)
  if (selectedRange.value?.start && selectedRange.value?.end) {
    params.append('date_start', selectedRange.value.start)
    params.append('date_end', selectedRange.value.end)
  }

  // Daily mode (optional)
  if (selectedDate.value) {
    params.append('filter_date', selectedDate.value)
  }
  // Fetch data dari backend
  try {
    const url = BASE_URL + 'dashboard/api/dome-grade/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()
    statsDome.value = data
  } catch (error) {
    console.error('Gagal ambil data Static:', error)
  } finally {
    isLoading.value = false
  }
}

function handleApply(payload: {
  type: '' | 'daily' | 'weekly' | 'yearly' | 'all' | 'monthly' | 'range',
  year?: number,
  month?: number,
  week?: number,
  range: { start: string; end: string },
  date: string
}) {
  if (!payload.type) {
    console.warn('Tipe filter kosong, tidak memuat data.')
    return  // Jangan lanjut kalau type kosong
  }

  chartFilter.apply(payload)
  fetchOreStats()
  fetchInventoryStats()
  fetchDomeStats()
}

onMounted(() => {
  fetchOreStats()
  fetchInventoryStats()
  fetchDomeStats()
})

const isTmmModalOpen = ref(false)
const tmmData = ref(
  Array.from({ length: 20 }, (_, i) => ({
    source: `Pit ${String.fromCharCode(65 + i)}`,
    value: Math.floor(Math.random() * 300) + 300
  }))
)
function openTmmModal() {
  isTmmModalOpen.value = true
}
</script>
