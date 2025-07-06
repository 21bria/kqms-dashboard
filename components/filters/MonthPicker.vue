<template>
  <Listbox v-model="internalValue" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="relative w-40">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 dark:border-gray-600 sm:text-sm">
        <span class="block truncate">{{ months[internalValue - 1] }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          <ListboxOption
            v-for="(month, index) in months"
            :key="index"
            :value="index + 1"
            as="template"
          >
            <li
              :class="[
                'cursor-default select-none relative py-2 pl-10 pr-4',
                internalValue === index + 1 ? 'bg-amber-100 text-amber-900' : 'text-gray-900 dark:text-white'
              ]"
            >
              <span class="block truncate">{{ month }}</span>
              <span v-if="internalValue === index + 1" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<!-- MonthPicker.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import {
  ChevronUpDownIcon,
  CheckIcon
} from '@heroicons/vue/20/solid'

// Props dan Emits
const props = defineProps<{
  modelValue?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// Daftar bulan
const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Nilai bulan saat ini (1–12)
const currentMonth = new Date().getMonth() + 1
const internalValue = ref<number>(props.modelValue ?? currentMonth)

// Sinkronisasi prop ↔ local state
watch(() => props.modelValue, (val) => {
  if (val !== internalValue.value && typeof val === 'number') {
    internalValue.value = val
  }
})

watch(internalValue, (val) => {
  emit('update:modelValue', val)
})
</script>
