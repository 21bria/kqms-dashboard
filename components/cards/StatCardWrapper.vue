<!-- components/StatCardWrapper.vue -->
<template>
  <StatCard
    :title="title"
    :value="value"
    :progressA="progressA"
    :progressB="progressB"
    :labelA="labelA"
    :labelB="labelB"
    :iconBg="iconBg"
    :to="to">
    <template #icon>
      <component :is="icon" class="h-5 w-5" />
    </template>
  </StatCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import StatCard from '@/components/cards/StatCard.vue'
import { useOreStatsStore } from '@/stores/oreStats'
import TmmIcon from '@/components/icons/TmmIcon.vue'
import OreIcon from '@/components/icons/OreIcon.vue'
import NonOreIcon from '@/components/icons/NonOreIcon.vue'

const props = defineProps<{
  type: 'TMM' | 'Ore' | 'Non Ore'
  to?: () => void
}>()

const statsStore = useOreStatsStore()

const active = computed(() => statsStore.activeStat)
const comparison = computed(() => statsStore.comparisonStat)

const value = computed(() => {
  if (props.type === 'TMM') return active.value?.total_actual || 0
  if (props.type === 'Ore') return active.value?.total_ore || 0
  if (props.type === 'Non Ore') return active.value?.total_non_ore || 0
  return 0
})

const progressA = computed(() => {
  if (props.type === 'TMM') return active.value?.achievement || 0
  if (props.type === 'Ore') return active.value?.achievement_ore || 0
  if (props.type === 'Non Ore') return active.value?.achievement_non_ore || 0
  return 0
})

const progressB = computed(() => {
  if (props.type === 'TMM') return comparison.value?.achievement || 0
  if (props.type === 'Ore') return comparison.value?.achievement_ore || 0
  if (props.type === 'Non Ore') return comparison.value?.achievement_non_ore || 0
  return 0
})

const icon = computed(() => {
  if (props.type === 'TMM') return TmmIcon
  if (props.type === 'Ore') return OreIcon
  if (props.type === 'Non Ore') return NonOreIcon
  return TmmIcon
})

const iconBg = computed(() => {
  if (props.type === 'TMM') return 'bg-primary-50 dark:bg-primary-900/30'
  if (props.type === 'Ore') return 'bg-secondary-50 dark:bg-secondary-900/30'
  if (props.type === 'Non Ore') return 'bg-accent-50 dark:bg-accent-900/30'
  return 'bg-gray-100'
})

const title = props.type
const labelA = statsStore.activeLabel
const labelB = statsStore.comparisonLabel
</script>
