<template>
  <Dialog :open="modelValue" @close="$emit('update:modelValue', false)">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/30 z-40" />

    <!-- Modal Content -->
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <DialogPanel class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <button
            @click="$emit('update:modelValue', false)"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="px-5 py-4 overflow-y-auto max-h-[70vh]">
          <slot />
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'

defineProps<{
  modelValue: boolean
  title: string
}>()
defineEmits(['update:modelValue'])
</script>
