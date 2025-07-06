<template>
  <Listbox v-model="selectedYear" @update:modelValue="emitUpdate">
    <div class="relative w-40">
      <ListboxButton
        class="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md border border-gray-300 dark:border-gray-600 sm:text-sm"
      >
        <span class="block truncate text-gray-900 dark:text-white">
          {{ selectedYear }}
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="year in years"
            :key="year"
            :value="year"
            as="template"
          >
            <li
              :class="[
                'cursor-default select-none relative py-2 pl-10 pr-4',
                selectedYear === year
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-200 dark:text-amber-900'
                  : 'text-gray-900 dark:text-white'
              ]"
            >
              <span class="block truncate">{{ year }}</span>
              <span
                v-if="selectedYear === year"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <CheckIcon class="h-5 w-5" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
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

// Props
const props = defineProps<{
  modelValue?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

// Year list
const currentYear = new Date().getFullYear()
const years = computed(() =>
  Array.from({ length: 3 }, (_, i) => currentYear - i)
)

// Local state
const selectedYear = ref<number>(props.modelValue ?? currentYear)

// Sync external modelValue
watch(() => props.modelValue, (val) => {
  if (val !== selectedYear.value && typeof val === 'number') {
    selectedYear.value = val
  }
})

// Emit back
const emitUpdate = (val: number) => {
  emit('update:modelValue', val)
}
</script>
