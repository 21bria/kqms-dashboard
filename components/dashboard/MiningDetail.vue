<template>
  <div class="max-w-[1550px] mx-auto sm:px-2 space-y-0">
    <!-- Header Section -->
    <div class="mb-6">
      <h1 class="text-xl font-bold text-gray-900 dark:text-white">Detail Mining</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Overview of your nickel mining operations</p>
    </div>

    <!-- Tombol Kembali -->
    <button @click="$router.push('/dashboard')" class="text-sm text-blue-500 underline mb-3">
      ← Back to Dashboard
    </button>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Monthly -->
      <template v-if="filterType === 'monthly'">
        <OreProductionMonthly :filter-type="filterType" />
        <TopSoilMovementMonthly :filter-type="filterType" />
        <ObMovementMonthly :filter-type="filterType" />
        <WasteMovementMonthly :filter-type="filterType" />
        <QuarryMovementMonthly :filter-type="filterType" />
        <OthersMovementMonthly :filter-type="filterType" />
      </template>

      <!-- Yearly -->
      <template v-else-if="filterType === 'yearly'">
        <OreProductionYearly :filter-type="filterType" />
        <TopSoilMovementYearly :filter-type="filterType" />
        <ObMovementYearly :filter-type="filterType" />
        <WasteMovementYearly :filter-type="filterType" />
        <QuarryMovementYearly :filter-type="filterType" />
        <OthersMovementYearly :filter-type="filterType" />
      </template>

      <!-- Daily -->
      <template v-else-if="filterType === 'daily'">
        <OreProductionDaily :filter-type="filterType" />
        <TopSoilMovementDaily :filter-type="filterType" />
        <ObMovementDaily :filter-type="filterType" />
        <WasteMovementDaily :filter-type="filterType" />
        <QuarryMovementDaily :filter-type="filterType" />
        <OthersMovementDaily :filter-type="filterType" />
      </template>

      <!-- Range -->
      <template v-else-if="filterType === 'range'">
        <OreProductionRange :filter-type="filterType" />
        <TopSoilMovementRange :filter-type="filterType" />
        <ObMovementRange :filter-type="filterType" />
        <WasteMovementRange :filter-type="filterType" />
        <QuarryMovementRange :filter-type="filterType" />
        <OthersMovementRange :filter-type="filterType" />
      </template>

      <!-- weekly -->
      <template v-else-if="filterType === 'weekly'">
        <OreProductionWeekly :filter-type="filterType" />
        <TopSoilMovementWeekly :filter-type="filterType" />
        <ObMovementWeekly :filter-type="filterType" />
        <WasteMovementWeekly :filter-type="filterType" />
        <QuarryMovementWeekly :filter-type="filterType" />
        <OthersMovementWeekly :filter-type="filterType" />
      </template>

      <!-- All -->
      <!-- <template v-else-if="filterType === 'all'">
        <MapsMovement :filter-type="filterType"/>
      </template> -->

      <!-- Default fallback -->
      <!-- <template v-else>
        <p class="text-gray-500 dark:text-gray-400 text-center col-span-2">
          Please select a valid filter type.
        </p>
      </template> -->
    </div>

    <!-- Grid khusus untuk filter 'all' -->
    <template v-if="filterType === 'all'">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <!-- Komponen besar (2 kolom) -->
        <div class="lg:col-span-2">
          <MapsMovement :filter-type="filterType" />
        </div>

        <!-- Komponen kecil (1 kolom) -->
        <div class="space-y-6">
          <MiningMovement :filter-type="filterType" />
        </div>
      </div>
    </template>
      <!-- <template v-else>
        <p class="text-gray-500 dark:text-gray-400 text-center col-span-2">
          Please select a valid filter type.
        </p>
      </template> -->

  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

// Ambil query params dari URL
const route = useRoute()
const filterType = route.query.filter_type || ''
const filterYear = route.query.filter_year || ''
const filterMonth = route.query.filter_month || ''
const filterWeek = route.query.filter_week || ''
const dateStart = route.query.date_start || ''
const dateEnd = route.query.date_end || ''

// Import Ore
import OreProductionMonthly from '@/components/dashboard/monthly/detail/OreProduction.vue'
import OreProductionYearly from '@/components/dashboard/yearly/detail/OreProduction.vue'
import OreProductionDaily from '@/components/dashboard/daily/detail/OreProduction.vue'
import OreProductionRange from '@/components/dashboard/range/detail/OreProduction.vue'
import OreProductionWeekly from '@/components/dashboard/weekly/detail/OreProduction.vue'

// Import Waste
import WasteMovementMonthly from '@/components/dashboard/monthly/detail/WasteMovement.vue'
import WasteMovementYearly from '@/components/dashboard/yearly/detail/WasteMovement.vue'
import WasteMovementDaily from '@/components/dashboard/daily/detail/WasteMovement.vue'
import WasteMovementRange from '@/components/dashboard/range/detail/WasteMovement.vue'
import WasteMovementWeekly from '@/components/dashboard/weekly/detail/WasteMovement.vue'

import ObMovementMonthly from '@/components/dashboard/monthly/detail/ObMovement.vue'
import ObMovementYearly from '@/components/dashboard/yearly/detail/ObMovement.vue'
import ObMovementDaily from '@/components/dashboard/daily/detail/ObMovement.vue'
import ObMovementRange from '@/components/dashboard/range/detail/ObMovement.vue'
import ObMovementWeekly from '@/components/dashboard/weekly/detail/ObMovement.vue'
// import ObMovementAll from '@/components/dashboard/all/detail/ObMovement.vue'

import TopSoilMovementMonthly from '@/components/dashboard/monthly/detail/TopSoilMovement.vue'
import TopSoilMovementYearly from '@/components/dashboard/yearly/detail/TopSoilMovement.vue'
import TopSoilMovementDaily from '@/components/dashboard/daily/detail/TopSoilMovement.vue'
import TopSoilMovementRange from '@/components/dashboard/range/detail/TopSoilMovement.vue'
import TopSoilMovementWeekly from '@/components/dashboard/weekly/detail/TopSoilMovement.vue'

import QuarryMovementMonthly from '@/components/dashboard/monthly/detail/QuarryMovement.vue'
import QuarryMovementYearly from '@/components/dashboard/yearly/detail/QuarryMovement.vue'
import QuarryMovementDaily from '@/components/dashboard/daily/detail/QuarryMovement.vue'
import QuarryMovementRange from '@/components/dashboard/range/detail/QuarryMovement.vue'
import QuarryMovementWeekly from '@/components/dashboard/weekly/detail/QuarryMovement.vue'

import OthersMovementMonthly from '@/components/dashboard/monthly/detail/OthersMovement.vue'
import OthersMovementYearly from '@/components/dashboard/yearly/detail/OthersMovement.vue'
import OthersMovementDaily from '@/components/dashboard/daily/detail/OthersMovement.vue'
import OthersMovementRange from '@/components/dashboard/range/detail/OthersMovement.vue'
import OthersMovementWeekly from '@/components/dashboard/weekly/detail/OthersMovement.vue'

// For All Mining
import MapsMovement from '@/components/maps/MapPit.client.vue'
import MiningMovement from '@/components/dashboard/all/detail/MiningMovement.vue'
</script>
