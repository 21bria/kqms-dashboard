<template>
  <div class="flex flex-wrap gap-3 items-center">
    <!-- Tipe Filter -->
    <Listbox v-model="filterType" as="div">
      <div class="relative w-40">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 dark:border-gray-600 sm:text-sm" >
          <span class="block truncate text-gray-900 dark:text-white">
            {{ filterTypeLabel }}
          </span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0" >
          <ListboxOptions
            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none" >
            <ListboxOption
              v-for="option in filterOptions"
              :key="option.value"
              :value="option.value"
              as="template">
              <li
                :class="[
                  'cursor-default select-none relative py-2 pl-10 pr-4',
                  filterType === option.value
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-200 dark:text-amber-900'
                    : 'text-gray-900 dark:text-white']" >
                <span class="block truncate">{{ option.label }}</span>
                <span
                  v-if="filterType === option.value"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <CheckIcon class="h-5 w-5" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <!-- Dynamic Pickers -->
    <YearPicker v-if="showYear" v-model="selectedYear" />
    <MonthPicker v-if="showMonth" v-model="selectedMonth" />
    <WeekPicker v-if="showWeek" v-model="selectedWeek" :year="selectedYear" :month="selectedMonth" />
    <DatePicker v-if="filterType === 'range'" v-model="selectedRange" />
    <DatePicker v-if="filterType === 'daily'" v-model="selectedDate" :single="true" />

    <!-- Apply Button -->
    <button @click="emitFilters" class="bg-violet-600 text-white text-sm px-4 py-1.5 rounded hover:bg-violet-700">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/20/solid'

import YearPicker from '@/components/filters/YearPicker.vue'
import MonthPicker from '@/components/filters/MonthPicker.vue'
import WeekPicker from '@/components/filters/WeekPicker.vue'
import DatePicker from '@/components/filters/DatePicker.vue'

type FilterType = 'all' | 'yearly' | 'monthly' | 'weekly' | 'range' | 'daily'

// const filterType = ref<FilterType>('all')
const filterType = ref<FilterType | ''>('') //  allow empty
const selectedYear = ref<number | undefined>(new Date().getFullYear())
const selectedMonth = ref<number | undefined>(new Date().getMonth() + 1)
const selectedWeek = ref<number | undefined>(1)

const selectedRange = ref<{ start: string; end: string }>({ start: '', end: '' })
const selectedDate = ref<string>('')

const filterOptions: { value: FilterType | '', label: string }[] = [
  { value: '', label: '-- Select --' },
  { value: 'all', label: 'All Data' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'range', label: 'Range' },
  { value: 'daily', label: 'Daily' }
]

// UI computed states
const filterTypeLabel = computed(() => {
  return filterOptions.find(opt => opt.value === filterType.value)?.label || 'All Data'
})
const showYear  = computed(() => ['yearly', 'monthly', 'weekly'].includes(filterType.value))
const showMonth = computed(() => ['monthly', 'weekly'].includes(filterType.value))
const showWeek  = computed(() => filterType.value === 'weekly')


watch(filterType, () => {
  if (filterType.value !== 'weekly' && filterType.value !== 'monthly' && filterType.value !== 'yearly') {
    selectedYear.value = undefined
  }
  if (filterType.value !== 'weekly' && filterType.value !== 'monthly') {
    selectedMonth.value = undefined
  }
  if (filterType.value !== 'weekly') {
    selectedWeek.value = undefined
  }

  if (filterType.value !== 'range') {
    selectedRange.value = { start: '', end: '' }
  }

  if (filterType.value !== 'daily') {
    selectedDate.value = ''
  }
})

// Emit typed event
const emit = defineEmits<{
  (e: 'apply', payload: {
    type: FilterType | '' // '' agar bisa kosong
    year: number | undefined
    month: number | undefined
    week: number | undefined
    range: { start: string; end: string }
    date: string
  }): void
}>()

const emitFilters = () => {
  emit('apply', {
    type: filterType.value,
    year: selectedYear.value,
    month: selectedMonth.value,
    week: selectedWeek.value,
    range: selectedRange.value,
    date: selectedDate.value
  })
}
</script>
