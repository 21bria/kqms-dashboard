<template>
  <Listbox v-model="model" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="relative w-52">
      <ListboxButton class="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 dark:border-gray-600 sm:text-sm">
        <span class="block truncate">
          {{ selectedLabel || 'Select Week' }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          <ListboxOption
            v-for="week in weeks"
            :key="week.value"
            :value="week.value"
            as="template"
          >
            <li
              :class="[
                'cursor-default select-none relative py-2 pl-10 pr-4',
                model === week.value ? 'bg-amber-100 text-amber-900' : 'text-gray-900 dark:text-white'
              ]"
            >
              <span class="block truncate">{{ week.label }}</span>
              <span v-if="model === week.value" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/20/solid'

// Props
const props = defineProps<{
  modelValue?: number
  year?: number
  month?: number
}>()

// Emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// Local state
const model = ref<number>(props.modelValue ?? 1)
watch(() => props.modelValue, (val) => {
  if (val !== model.value && typeof val === 'number') model.value = val
})
const emitUpdate = (val: number) => emit('update:modelValue', val)

// Week generator
function getWeeksInMonth(year: number, month: number) {
  const weeks: { value: number; label: string }[] = []
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  let start = new Date(firstDay)

  while (start <= lastDay) {
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    if (end > lastDay) end.setDate(lastDay.getDate())

    const weekNumber = getISOWeekNumber(start)
    weeks.push({
      value: weekNumber,
      label: `Week ${weekNumber} (${start.getDate()}–${end.getDate()})`
    })

    start.setDate(start.getDate() + 7)
  }

  return weeks
}

// ISO Week number helper
function getISOWeekNumber(date: Date): number {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = temp.getUTCDay() || 7
  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1))
  return Math.ceil((((+temp - +yearStart) / 86400000) + 1) / 7)
}

// Computed: Weeks
const weeks = computed(() => {
  if (!props.year || !props.month) return []
  return getWeeksInMonth(props.year, props.month)
})

// Selected label
const selectedLabel = computed(() =>
  weeks.value.find(w => w.value === model.value)?.label
)
</script>