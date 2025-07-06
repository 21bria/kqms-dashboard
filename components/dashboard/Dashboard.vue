<template>
  <!-- <div class="max-w-8xl mx-auto  sm:px-2 lg:px-8 space-y-2"> -->
  <div class="max-w-[1640px] mx-auto sm:px-2 space-y-0">
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
    <div class="grid grid-cols-12 gap-6">
      <div class="xl:col-span-7 col-span-12">
        <div class="grid grid-cols-12 gap-4">
          <!-- Card Static -->
          <template v-if="isLoading">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </template>
          <template v-else>
            <div class="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
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
            </div>
            <div class="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
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
            </div>
            <div class="xl:col-span-4 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
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
          <!-- Mine Production Chart -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
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
                      <a class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">View
                        Details<i class="bi bi-box-arrow-up-right text-[0.6875rem] ms-2" /></a>
                    </NuxtLink>
                  </div>
                </div>
              </div>
              <div class="h-64">
                <ChartDailyMining v-if="selectedChartType === 'daily'" />
                <ChartWeeklyMining v-else-if="selectedChartType === 'weekly'" />
                <ChartMonthlyMining v-else-if="selectedChartType === 'monthly'" />
                <ChartRangeMining v-else-if="selectedChartType === 'range'" />
                <ChartYearlyMining v-else-if="selectedChartType === 'yearly'" />
                <ChartAllMining v-else-if="selectedChartType === 'all'" />
              </div>
            </div>

          </div>
          <!-- Selling Chart -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-between mb-6">
                <div>
                  <!-- <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Selling Performance</h3> -->
                  <p class="text-sm text-gray-500 dark:text-gray-400">Chart data last refreshed</p>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-2">
                    <NuxtLink to="/dashboard/selling"
                      class="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <a href="javascript:void(0);"
                        class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">View
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

          </div>
          <!-- Inventory Chart -->
          <div class="xl:col-span-12 col-span-12">
            <MetricCard title="📍 Inventory Chart">
              <!-- Slot header -->
              <template #header>
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
              </template>
              <ChartMonthlyInventory v-if="selectedChartType === ''" />
              <!-- Tampilkan chart sesuai pilihan -->
              <!-- <ChartMonthlyInventory v-if="selectedChartType === 'daily'" /> -->
              <ChartWeeklyInventory v-else-if="selectedChartType === 'weekly'" />
              <ChartMonthlyInventory v-else-if="selectedChartType === 'monthly'" />
              <ChartRangeInventory v-else-if="selectedChartType === 'range'" />
              <ChartYearlyInventory v-else-if="selectedChartType === 'yearly'" />
              <ChartAllInventory v-else-if="selectedChartType === 'all'" />
              <!-- Slot footer -->
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
            <div class="bg-white dark:bg-gray-800  !p-0">
              <div class="p-4">
                <div class="flex items-center mb-2">
                  <span>
                    <div class="bg-primary-50 dark:bg-primary-900/30 p-3 rounded-lg"><svg
                        xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"
                        class="h-5 w-5 text-primary-600 dark:text-primary-400" fill="currentColor">
                        <path
                          d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z">
                        </path>
                      </svg></div>
                  </span>
                  <p class="mb-0 ml-3 flex-grow  dark:text-white/60">Total Selling</p>
                </div>
                <span class="text-[1.25rem] font-semibold"> {{ formatShortNumber(statsSelling.total_ore) || 0
                }}</span><span class="text-[0.75rem] text-success ms-1"><i class="inline-block"></i>Ton
                </span>
                <span class="text-[1.25rem] font-semibold">

                </span>
                <div>
                  <button
                    class="text-xs font-medium text-violet-600 hover:underline hover:text-violet-700 focus:outline-none">
                    View
                    All → </button>
                </div>
              </div>
              <!-- Are Selling / Revenue -->

              <div class="flex flex-col max-h-[230px] overflow-hidden ">
                <div class="flex justify-center items-center w-full">
                  <SparklineDailySelling v-if="selectedChartType === 'daily'" />
                  <SparklineWeeklySelling v-else-if="selectedChartType === 'weekly'" />
                  <SparklineMonthlySelling v-else-if="selectedChartType === 'monthly'" />
                  <SparklineRangeSelling v-else-if="selectedChartType === 'range'" />
                  <SparklineYearlySelling v-else-if="selectedChartType === 'yearly'" />
                  <SparklineAllSelling v-else-if="selectedChartType === 'all'" />
                  <div v-else class="text-sm text-gray-400 text-center py-20">
                    No chart selected.
                  </div>
                </div>
              </div>

            </div>

            <!-- Selling Composition (RadialBar Compact) -->
            <div class="grid grid-cols-1 gap-3 mt-3">
              <template v-if="isLoading">
                <div v-for="i in 2" :key="i"
                  class="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                  <!-- Lingkaran sempurna -->
                  <div class="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                  <!-- Text Placeholder -->
                  <div class="ml-4 flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div class="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                  </div>
                </div>
              </template>
              <template v-else>
                <BaseRadialBar :data="dataList" :key="chartKey" />
              </template>
            </div>
          </div>
          <!-- Materials By Class-->
          <div class="xxl:col-span-7 xl:col-span-7 col-span-12">
            <MetricCard title="Ore By Class">
              <!-- Donut Chart -->
              <div class="flex justify-center items-center w-full">
                <ChartDailyOreClass v-if="selectedChartType === 'daily'"
                  @update:percents="(val: number) => oreClassPercents = val" />
                <ChartWeeklyOreClass v-else-if="selectedChartType === 'weekly'"
                  @update:percents="(val: number) => oreClassPercents = val" />
                <ChartMonthlyOreClass v-else-if="selectedChartType === 'monthly'"
                  @update:percents="(val: number) => oreClassPercents = val" />
                <ChartRangeOreClass v-else-if="selectedChartType === 'range'"
                  @update:percents="(val: number) => oreClassPercents = val" />
                <ChartYearlyOreClass v-else-if="selectedChartType === 'yearly'"
                  @update:percents="(val: number) => oreClassPercents = val" />
                <ChartAllOreClass v-else-if="selectedChartType === 'all'"
                  @update:percents="(val: number) => oreClassPercents = val" />
                <div v-else class="text-sm text-gray-400 text-center py-20">
                  No chart selected.
                </div>
              </div>


              <!-- Slot footer -->
              <template #footer>
                <div v-if="Array.isArray(oreClassPercents) && oreClassPercents.length"
                  class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center">
                  <div v-for="item in oreClassPercents" :key="item.label" class="p-2">
                    <p class="text-xs text-gray-500 dark:text-white/50 font-medium">{{ item.label }}</p>
                    <p class="text-sm font-bold text-gray-800 dark:text-white">{{ item.percent }}%</p>
                  </div>
                </div>

                <div v-else class="text-sm text-gray-400 text-center py-4">
                  Loading ore class breakdown...
                </div>
                <div class=" dark:bg-gray-800">
                  <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2" v-if="stats">
                    <!-- Limonite -->
                    <div>
                      <div class="flex justify-between items-center mb-1">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Limonite</span>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {{ formatShortNumber(statsQuality.total_lim) }} / {{ formatShortNumber(statsQuality.total_ore) }}
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div class="bg-yellow-400 h-3 rounded-full"
                          :style="{ width: `${(statsQuality.total_lim / statsQuality.total_ore) * 100}%` }"></div>
                      </div>
                    </div>

                    <!-- Saprolite -->
                    <div>
                      <div class="flex justify-between items-center mb-1">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Saprolite</span>
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {{ formatShortNumber(statsQuality.total_sap) }} / {{ formatShortNumber(statsQuality.total_ore) }}
                        </span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div class="bg-green-500 h-3 rounded-full"
                          :style="{ width: `${(statsQuality.total_sap / statsQuality.total_ore) * 100}%` }"></div>
                      </div>
                    </div>
                  </div>

                </div>
              </template>
            </MetricCard>

          </div>
          <!-- Ore  Quality Chart -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
            <MetricCard title="Ore Quality Chart">
              <!-- Slot header -->
              <template #header>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm p-3">
                  <div
                    class=" xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <p class="text-gray-500 dark:text-gray-400">Limonite</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">{{
                      formatShortNumber(statsQuality.total_lim) || 0 }}</p>
                    <p class="text-sm">
                      <span class="inline-block px-2 py-0.5  text-[#906de3] text-xs font-medium lowercase">
                        {{ activeStat?.achievement_limonite ?? 0 }}% {{ activeLabel?.toLowerCase() }} </span>
                      <span class="text-gray-500 dark:text-gray-400"> | </span>
                      <span class="inline-block px-2 py-0.5 text-[#3ebee7] text-xs font-medium lowercase">
                        {{ comparisonStat?.achievement_limonite ?? 0 }}% {{ comparisonLabel?.toLowerCase() }}</span>
                    </p>
                  </div>
                  <div
                    class="xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <p class="text-gray-500 dark:text-gray-400">Saprolite</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">
                      {{ formatShortNumber(statsQuality.total_sap) || 0 }}</p>
                    <p class="text-sm">
                      <span class="inline-block px-2 py-0.5  text-[#906de3] text-xs font-medium lowercase">
                        {{ activeStat?.achievement_saprolite ?? 0 }}% {{ activeLabel?.toLowerCase() }} </span>
                      <span class="text-gray-500 dark:text-gray-400"> | </span>
                      <span class="inline-block px-2 py-0.5 text-[#3ebee7] text-xs font-medium lowercase">
                        {{ comparisonStat?.achievement_saprolite ?? 0 }}% {{ comparisonLabel?.toLowerCase() }}</span>
                    </p>
                  </div>
                  <div
                    class="xl:col-span-1 lg:col-span-1 md:col-span-12 sm:col-span-6 col-span-12 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                    <p class="text-gray-500 dark:text-gray-400">Totals Ore</p>
                    <p class="text-lg font-semibold text-gray-800 dark:text-white">{{
                      formatShortNumber(statsQuality.total_ore) || 0 }}</p>
                    <p class="text-sm">
                      <span class="inline-block px-2 py-0.5  text-[#906de3] text-xs font-medium lowercase">
                        {{ activeStat?.achievement_ore ?? 0 }}% {{ activeLabel?.toLowerCase() }} </span>
                      <span class="text-gray-500 dark:text-gray-400"> | </span>
                      <span class="inline-block px-2 py-0.5 text-[#3ebee7] text-xs font-medium lowercase">
                        {{ comparisonStat?.achievement_ore ?? 0 }}% {{ comparisonLabel?.toLowerCase() }}</span>
                    </p>
                  </div>
                </div>
              </template>

              <!-- Chart -->
              <ChartDailyGeology v-if="selectedChartType === 'daily'" />
              <ChartWeeklyGeology v-else-if="selectedChartType === 'weekly'" />
              <ChartMonthlyGeology v-else-if="selectedChartType === 'monthly'" />
              <ChartRangeGeology v-else-if="selectedChartType === 'range'" />
              <ChartYearlyGeology v-else-if="selectedChartType === 'yearly'" />
              <ChartAllGeology v-else-if="selectedChartType === 'all'" />

              <!-- Footer (optional) -->
              <template #footer>

                <div class="mx-auto w-full rounded-lg p-2">
                  <Disclosure v-slot="{ open }">
                    <DisclosureButton
                      class="flex w-full justify-between rounded-lg bg-gray-100 dark:bg-gray-700 px-4 py-2 text-left text-sm font-medium text-purple-900 dark:text-[#906de3]  hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                      <span>Please click to display Ore Grade</span>
                      <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-purple-500" />
                    </DisclosureButton>
                    <DisclosurePanel class="px-1 pb-2 pt-1 text-sm text-gray-600 dark:text-gray-300 ">
                      <div class="overflow-x-auto">
                        <table class="min-w-full text-sm">
                          <thead class="text-gray-600 dark:text-gray-300">
                            <tr>
                              <th class="text-left py-2 px-3 text-xs">#</th>
                              <th class="text-left py-2 px-3 text-xs">ni</th>
                              <th class="text-left py-2 px-3 text-xs">co</th>
                              <th class="text-left py-2 px-3 text-xs">al2o3</th>
                              <th class="text-left py-2 px-3 text-xs">cr2o3</th>
                              <th class="text-left py-2 px-3 text-xs">fe</th>
                              <th class="text-left py-2 px-3 text-xs">mgo</th>
                              <th class="text-left py-2 px-3 text-xs">sio2</th>
                              <th class="text-left py-2 px-3 text-xs">sm</th>
                              <th class="text-left py-2 px-3 text-xs">class</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in statsGradeOre.data" :key="index"
                              class="border-t border-gray-200 dark:border-gray-700">
                              <!-- <td class="py-2 px-3">{{ index + 1 }}</td> -->
                              <td class="py-2 px-3">{{ item.nama_material }}</td>
                              <td class="py-2 px-3">{{ Number(item.ni).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ Number(item.co).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ Number(item.al2o3).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ Number(item.cr2o3).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ Number(item.fe).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ Number(item.mgo).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ Number(item.sio2).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ Number(item.sm).toFixed(2) }}</td>
                              <td class="py-2 px-3">{{ item.grade }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </div>

              </template>
            </MetricCard>
          </div>

          <!-- Table Dome Ach -->
          <div class="xxl:col-span-12 xl:col-span-12 col-span-12">
            <MetricCard title="Data Dome" class="!p-4">
              <!-- Header opsional -->
              <template #header></template>
              <!-- Wrapper agar flex column -->
              <div class="flex flex-col max-h-[270px] overflow-hidden">
                <!-- Konten scrollable (isi list OreByDome) -->
                <div class="flex-1 overflow-y-auto custom-scroll px-2 py-2">
                  <OreByDome :items="statsDome.data" />
                </div>
              </div>
              <!-- Footer tetap terlihat -->
              <template #footer>
                <div class=" px-4 py-2">
                  <button
                    class="w-full text-sm text-violet-600 hover:underline hover:text-violet-700 dark:hover:text-violet-500 transition-colors">
                    View All →
                  </button>
                </div>
              </template>

            </MetricCard>
          </div>

        </div>

      </div>
    </div>

  </div>
  <!-- Call Modals -->
  <TmmModal v-model="isTmmModalOpen" :data="tmmData" />

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useChartFilterStore } from '@/stores/chartFilter'
import MetricCard from '@/components/dashboard/MetricCard.vue'
import 'leaflet/dist/leaflet.css'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'

import MapStockpile from '@/components/maps/MapStockpile.client.vue'
import OreByDome from '@/components/dashboard/table/OreByDome.vue'
import { formatShortNumber } from '@/utils/formatter'
import { BASE_URL } from '@/utils/api'
import FilterControls from '@/components/filters/FilterControls.vue'
import StatCard from '@/components/cards/StatCard.vue'
import TmmModal from '@/components/dashboard/modals/TmmModal.vue'
import StatCardSkeleton from '@/components/shimmer/StatCardSkeleton.vue'
import BaseRadialBar from '@/components/charts/BaseRadialBar.vue'


// Import Chart Komponen
import ChartAllMining from '@/components/dashboard/all/ChartAllMining.vue'
import ChartAllGeology from '@/components/dashboard/all/ChartAllGeology.vue'
import ChartAllOreClass from '@/components/dashboard/all/ChartAllOreClass.vue'
import ChartAllSelling from '@/components/dashboard/all/ChartAllSelling.vue'
import SparklineAllSelling from '@/components/dashboard/all/SparklineAllSelling.vue'
import ChartAllInventory from '@/components/dashboard/all/ChartAllInventory.vue'

import ChartYearlyMining from '@/components/dashboard/yearly/ChartYearlyMining.vue'
import ChartYearlyGeology from '@/components/dashboard/yearly/ChartYearlyGeology.vue'
import ChartYearlyOreClass from '@/components/dashboard/yearly/ChartYearlyOreClass.vue'
import ChartYearlySelling from '@/components/dashboard/yearly/ChartYearlySelling.vue'
import SparklineYearlySelling from '@/components/dashboard/yearly/SparklineYearlySelling.vue'
import ChartYearlyInventory from '@/components/dashboard/yearly/ChartYearlyInventory.vue'

import ChartMonthlyMining from '@/components/dashboard/monthly/ChartMonthlyMining.vue'
import ChartMonthlyGeology from '@/components/dashboard/monthly/ChartMonthlyGeology.vue'
import ChartMonthlyOreClass from '@/components/dashboard/monthly/ChartMonthlyOreClass.vue'
import ChartMonthlySelling from '@/components/dashboard/monthly/ChartMonthlySelling.vue'
import SparklineMonthlySelling from '@/components/dashboard/monthly/SparklineMonthlySelling.vue'
import ChartMonthlyInventory from '@/components/dashboard/monthly/ChartMonthlyInventory.vue'

import ChartRangeMining from '@/components/dashboard/range/ChartRangeMining.vue'
import ChartRangeGeology from '@/components/dashboard/range/ChartRangeGeology.vue'
import ChartRangeOreClass from '@/components/dashboard/range/ChartRangeOreClass.vue'
import ChartRangeSelling from '@/components/dashboard/range/ChartRangeSelling.vue'
import SparklineRangeSelling from '@/components/dashboard/range/SparklineRangeSelling.vue'
import ChartRangeInventory from '@/components/dashboard/range/ChartRangeInventory.vue'

import ChartWeeklyMining from '@/components/dashboard/weekly/ChartWeeklyMining.vue'
import ChartWeeklyGeology from '@/components/dashboard/weekly/ChartWeeklyGeology.vue'
import ChartWeeklyOreClass from '@/components/dashboard/weekly/ChartWeeklyOreClass.vue'
import ChartWeeklySelling from '@/components/dashboard/weekly/ChartWeeklySelling.vue'
import SparklineWeeklySelling from '@/components/dashboard/weekly/SparklineWeeklySelling.vue'
import ChartWeeklyInventory from '@/components/dashboard/weekly/ChartWeeklyInventory.vue'

import ChartDailyMining from '@/components/dashboard/daily/ChartDailyMining.vue'
import ChartDailyGeology from '@/components/dashboard/daily/ChartDailyGeology.vue'
import ChartDailyOreClass from '@/components/dashboard/daily/ChartDailyOreClass.vue'
import ChartDailySelling from '@/components/dashboard/daily/ChartDailySelling.vue'
import SparklineDailySelling from '@/components/dashboard/daily/SparklineDailySelling.vue'


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

const oreClassPercents = ref([])
const statsQuality = ref<any>({})

async function fetchQualityStats(): Promise<void> {
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
    const url = BASE_URL + 'dashboard/api/ore-summary/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()
    statsQuality.value = data
    console.log('Get data Static:', data)
  } catch (error) {
    console.error('Gagal ambil data Static:', error)
    statsQuality.value = {}
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

// composable atau di <script setup>
const statsSelling = ref({})
const dataList = ref<{ label: string; percent: number; value: string; color: string }[]>([])
const chartKey = ref(0)
async function fetchSellingStats(): Promise<void> {
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
    const url = BASE_URL + 'dashboard/api/selling-summary/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()

    statsSelling.value = data
    console.log('✅ Data Selling Summary:', data)

    const totalOre = data.total_ore || 0
    const totalLim = data.total_lim || 0
    const totalSap = data.total_sap || 0

    const limPercent = totalOre ? Math.round((totalLim / totalOre) * 100) : 0
    const sapPercent = totalOre ? Math.round((totalSap / totalOre) * 100) : 0

    dataList.value = [
      {
        label: 'Limonite',
        percent: limPercent,
        value: (totalLim).toFixed(2), // misalnya ton ke KTon
        color: '#23b7e5'
      },
      {
        label: 'Saprolite',
        percent: sapPercent,
        // value: (totalSap / 1000).toFixed(2),
        value: (totalSap).toFixed(2),
        color: '#fbbf24'
      }
    ]
    chartKey.value += 1 // ⬅️ Paksa re-render
  } catch (error) {
    console.error('❌ Gagal ambil data Static:', error)
    statsSelling.value = {}
    dataList.value = []
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

const statsGradeOre = ref({ data: [] })
async function fetchGradeOre(): Promise<void> {
  isLoading.value = true
  // Kosongkan data sebelum fetch baru
  statsGradeOre.value = { data: [] }
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
    const url = BASE_URL + 'dashboard/api/ore-grade/?' + params.toString()
    const response = await fetch(url)
    const data = await response.json()
    statsGradeOre.value = data
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
  fetchQualityStats()
  fetchInventoryStats()
  fetchDomeStats()
  fetchSellingStats()
  fetchGradeOre()
}

onMounted(() => {
  fetchOreStats()
  fetchQualityStats()
  fetchInventoryStats()
  fetchDomeStats()
  fetchSellingStats()
  fetchGradeOre()
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
<style>
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.4) transparent;
  scroll-behavior: smooth;
}

/* Chrome, Safari, Edge */
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.4);
  border-radius: 6px;
  border: 2px solid transparent;
  background-clip: content-box;
}
</style>
